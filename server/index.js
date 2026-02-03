const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ============ 보안 설정 ============

// 1. Helmet - 보안 헤더 설정
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 2. CORS - 화이트리스트 기반
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://senior119.up.railway.app',
    'https://senior119-production.up.railway.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS 정책에 의해 차단되었습니다.'), false);
    },
    credentials: true
}));

// 3. Rate Limiting - API 남용 방지
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1분
    max: 30, // 분당 30회 제한
    message: { success: false, error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
    standardHeaders: true,
    legacyHeaders: false
});

app.use('/api/', limiter);

// OCR 요청은 더 엄격하게 제한
const ocrLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10, // 분당 10회
    message: { success: false, error: 'OCR 요청이 너무 많습니다. 1분 후 다시 시도해주세요.' }
});

// ============ 파일 업로드 설정 ============

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        // 허용된 MIME 타입
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('지원하지 않는 이미지 형식입니다. (JPG, PNG, GIF, WEBP만 가능)'), false);
        }
    }
});

// Gemini API setup
const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

// ============ 미들웨어 ============

app.use(express.json({ limit: '1mb' })); // Body 크기 제한

// ============ API 라우트 ============

// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Senior119 Backend is running' });
});

// 2. Save Statistics (Prototype) - 입력값 검증 추가
app.post('/api/diagnosis', (req, res) => {
    const { type, result, answers, timestamp } = req.body;

    // 입력값 검증
    if (!type || typeof type !== 'string' || type.length > 50) {
        return res.status(400).json({ success: false, error: '잘못된 요청입니다.' });
    }

    console.log("📝 [New Diagnosis Result]");
    console.log(`- Type: ${type.substring(0, 50)}`); // 길이 제한
    console.log(`- Time: ${new Date().toISOString()}`);

    res.json({ success: true, message: 'Diagnosis saved' });
});

// 3. OCR - Document Analysis with Gemini
app.post('/api/ocr', ocrLimiter, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: '이미지를 업로드해주세요.' });
        }

        if (!genAI) {
            return res.status(500).json({ success: false, error: 'OCR 서비스가 설정되지 않았습니다.' });
        }

        console.log("📸 [OCR Request] Processing image...");

        const base64Image = req.file.buffer.toString('base64');
        const mimeType = req.file.mimetype;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `이 이미지는 한국의 "자격득실확인서" 또는 "급여명세서" 또는 "근로계약서"일 수 있습니다.

이 문서에서 다음 정보를 찾아 JSON 형식으로 추출해주세요:
1. 취득일 (입사일, 자격취득일) - "startDate" 키로
2. 상실일 (퇴사일, 자격상실일) - "endDate" 키로  
3. 사업장명 (회사명, 직장명) - "workplace" 키로
4. 월 급여 또는 임금 (있는 경우) - "salary" 키로

날짜는 "YYYY-MM-DD" 형식으로 변환해주세요.
급여는 숫자만 추출해주세요 (예: 2500000).

만약 해당 정보를 찾을 수 없으면 null로 표시해주세요.

응답은 반드시 아래 JSON 형식으로만 해주세요 (다른 텍스트 없이):
{
  "startDate": "YYYY-MM-DD 또는 null",
  "endDate": "YYYY-MM-DD 또는 null",
  "workplace": "회사명 또는 null",
  "salary": 숫자 또는 null
}`;

        const result = await model.generateContent([
            prompt,
            { inlineData: { mimeType, data: base64Image } }
        ]);

        const response = await result.response;
        const text = response.text();

        console.log("🤖 Gemini Response received");

        let parsedData;
        try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsedData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('JSON not found');
            }
        } catch (parseError) {
            return res.status(500).json({
                success: false,
                error: '문서를 분석했지만 형식을 인식하지 못했습니다.'
            });
        }

        res.json({ success: true, data: parsedData });

    } catch (error) {
        console.error("❌ OCR Error:", error.message);
        // 상세 에러 메시지 숨김 (보안)
        res.status(500).json({
            success: false,
            error: '이미지 분석 중 오류가 발생했습니다.'
        });
    }
});

// 4. AI Chat - 노동법 상담 챗봇
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20, // 분당 20회
    message: { success: false, error: '채팅 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' }
});

app.post('/api/chat', chatLimiter, async (req, res) => {
    try {
        const { message, context } = req.body;

        if (!message || typeof message !== 'string' || message.length > 1000) {
            return res.status(400).json({ success: false, error: '메시지를 입력해주세요.' });
        }

        if (!genAI) {
            return res.status(500).json({ success: false, error: 'AI 서비스가 설정되지 않았습니다.' });
        }

        console.log("💬 [Chat Request]:", message.substring(0, 50));

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const systemPrompt = `당신은 한국 노동법 전문 상담사입니다. 65세 이상 어르신들이 이해하기 쉽게 친절하게 설명해주세요.

당신이 상담하는 주요 분야:
- 실업급여 (65세 이상 특례, 자격 요건)
- 퇴직금 (계산법, 미지급 시 대응)
- 임금체불 (신고 방법, 증거 수집)
- 4대보험 (국민연금, 건강보험, 고용보험, 산재보험)
- 부당해고 (노동위원회 구제신청)
- 최저임금, 주휴수당, 연차휴가

응답 규칙:
1. 쉬운 단어로 짧게 설명 (3-4문장)
2. 구체적인 금액이나 기간은 "대략", "약"으로 표현
3. 정확한 상담이 필요하면 "고용노동부 1350"이나 "대한법률구조공단 132" 안내
4. 존댓말 사용, 따뜻한 말투
5. 이모지 적절히 사용
6. 법률 조언이 아닌 일반적인 정보 제공임을 명시

절대로 법률 자문을 해주지 마세요. 정확한 판단은 전문가 상담을 권장하세요.`;

        const result = await model.generateContent([
            systemPrompt,
            `사용자 질문: ${message}`
        ]);

        const response = await result.response;
        const reply = response.text();

        console.log("🤖 [Chat Reply]:", reply.substring(0, 50));

        res.json({ success: true, reply });

    } catch (error) {
        console.error("❌ Chat Error:", error.message);
        res.status(500).json({
            success: false,
            error: '답변 생성 중 오류가 발생했습니다.'
        });
    }
});

// ============ 에러 핸들링 ============

app.use((error, req, res, next) => {
    console.error("Server Error:", error.message);

    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ success: false, error: '파일 크기는 10MB 이하여야 합니다.' });
        }
    }

    // 상세 에러 메시지 숨김
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
});

// ============ 서버 시작 ============

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔒 Security: Helmet, CORS whitelist, Rate limiting enabled`);
    if (genAI) {
        console.log('✅ Gemini API configured');
    } else {
        console.log('⚠️ GEMINI_API_KEY not set');
    }
});
