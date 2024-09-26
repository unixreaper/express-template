const MODULE_CODE = {
    SERVER: 'SVR',
    GENERAL: 'GEN',
    AUTHEN: 'PER',
    RECOVER: 'REC',
    ASSET: 'AST',
    CUSTOMER: 'USR',
    GAME_ORDER: 'ORD',
    TRANSACTION: 'TXN',
    ADMIN: 'ADM',
    DOCUMENT: 'DOC',
    IMAGE: 'IMG',
    CHART: 'CHT',
    EMAIL: 'EML',
    SUMMARY: 'SUM',
    INSURANCE: 'INS',
};

const ERROR_MESSAGE_MAP = {
    GENERAL: {
        status: 400,
        code: '4000',
        th: 'ระบบไม่สามารถดำเนินการได้ในขณะนี้',
        en: 'The system cannot process your request at the moment.',
    },
    WRONG_PASSWORD: {
        status: 400,
        code: '4444',
        th: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        en: 'The username or password you entered is incorrect.',
    },
    OUT_OF_SERVICE: {
        status: 503,
        code: '4022',
        th: 'ระบบปิดทำการในขณะนี้ กรุณาลองใหม่อีกครั้ง',
        en: 'The system is currently out of service. Please try again later.',
    },
    LIMIT_TIME: {
        status: 400,
        code: '1100',
        th: 'คุณทำรายการนี้บ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง',
        en: 'You are making this request too frequently. Please wait a moment and try again.',
    },
    INTERNAL: {
        status: 500,
        code: '5000',
        th: 'ระบบมีปัญหากรุณาติดต่อเจ้าหน้าที่',
        en: 'A system error occurred. Please contact support.',
    },
    MAINTENANCE: {
        status: 503,
        code: '5030',
        th: 'ระบบปิดทำการในขณะนี้ กรุณาลองใหม่ภายหลัง',
        en: 'The server is down for maintenance. Please try again later.',
    },
    VERIFY: {
        status: 500,
        code: '5000',
        th: 'ไม่สามารถทำรายการได้เนื่องจากยังยืนยันตัวตนไม่สำเร็จ',
        en: 'The request cannot be processed because self-verification is not complete.',
    },
    AUTHEN: {
        status: 401,
        code: '8888',
        th: 'ระบบปฎิเสธการเข้าถึงข้อมูล',
        en: 'Access denied. You are not authorized to access this data.',
    },
    TIMEOUT: {
        status: 401,
        code: '8899',
        th: 'ใช้ระยะเวลานานเกินที่กำหนด',
        en: 'Your session has timed out. Please log in again.',
    },
    PERMISSION: {
        status: 401,
        code: '9999',
        th: 'คุณไม่มีสิทธิ์ในการเข้าถึงระบบนี้',
        en: 'You do not have permission to access this system.',
    },
    DUPLICATED: {
        status: 400,
        code: '0002',
        th: 'ข้อมูลซ้ำในระบบ',
        en: 'The data already exists in the system.',
    },
    FORM: {
        status: 400,
        code: '0001',
        th: 'ข้อมูลที่ระบุไม่ถูกต้องหรือครบถ้วน',
        en: 'The information provided is incorrect or incomplete.',
    },
    BALANCE: {
        status: 400,
        code: '0044',
        th: 'ยอดเงินในบัญชีมีไม่เพียงพอ',
        en: 'Your account balance is insufficient.',
    },
    EMAIL: {
        status: 400,
        code: '4001',
        th: 'เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง',
        en: 'An error occurred while sending the email. Please try again.',
    },
    REFERRAL_ID: {
        status: 400,
        code: '40012',
        th: 'รหัสผู้แนะนำไม่ถูกต้อง',
        en: 'The referral ID you entered is invalid.',
    },
    NOT_FOUND: {
        status: 404,
        code: '4040',
        th: 'ไม่พบข้อมูลที่ต้องการ',
        en: 'The requested information was not found.',
    },
    UNAUTHORIZED: {
        status: 401,
        code: '4010',
        th: 'คุณไม่มีสิทธิ์เข้าถึงเนื้อหานี้',
        en: 'You are not authorized to access this content.',
    },
    BAD_REQUEST: {
        status: 400,
        code: '4001',
        th: 'คำขอไม่ถูกต้อง',
        en: 'Bad request. Please check the data and try again.',
    },
    CONFLICT: {
        status: 409,
        code: '4090',
        th: 'มีความขัดแย้งกับข้อมูลที่มีอยู่',
        en: 'There is a conflict with the existing data.',
    },
    TOO_MANY_REQUESTS: {
        status: 429,
        code: '4290',
        th: 'คุณส่งคำขอมากเกินไป กรุณาลองใหม่ภายหลัง',
        en: 'You have sent too many requests. Please try again later.',
    },
    FORBIDDEN: {
        status: 403,
        code: '4030',
        th: 'การเข้าถึงถูกห้าม',
        en: 'Access to this resource is forbidden.',
    },
    SERVICE_UNAVAILABLE: {
        status: 503,
        code: '5031',
        th: 'บริการไม่พร้อมใช้งานในขณะนี้ กรุณาลองใหม่ภายหลัง',
        en: 'Service is currently unavailable. Please try again later.',
    },
    METHOD_NOT_ALLOWED: {
        status: 405,
        code: '4050',
        th: 'วิธีการนี้ไม่ได้รับอนุญาต',
        en: 'This method is not allowed.',
    },
    REQUEST_ENTITY_TOO_LARGE: {
        status: 413,
        code: '4130',
        th: 'ขนาดของคำขอใหญ่เกินไป',
        en: 'The request entity is too large.',
    },
    UNSUPPORTED_MEDIA_TYPE: {
        status: 415,
        code: '4150',
        th: 'ประเภทของไฟล์ไม่ได้รับการสนับสนุน',
        en: 'The media type is unsupported.',
    },
    INVALID_CREDENTIALS: {
        status: 401,
        code: '4011',
        th: 'ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง',
        en: 'Invalid login credentials.',
    },
    TOKEN_EXPIRED: {
        status: 401,
        code: '4012',
        th: 'โทเค็นหมดอายุ',
        en: 'The token has expired.',
    },
    TOKEN_INVALID: {
        status: 401,
        code: '4013',
        th: 'โทเค็นไม่ถูกต้อง',
        en: 'The token is invalid.',
    },
    ACCOUNT_LOCKED: {
        status: 403,
        code: '4031',
        th: 'บัญชีของคุณถูกล็อค กรุณาติดต่อฝ่ายสนับสนุน',
        en: 'Your account has been locked. Please contact support.',
    },
    ACCOUNT_DISABLED: {
        status: 403,
        code: '4032',
        th: 'บัญชีของคุณถูกปิดใช้งาน',
        en: 'Your account has been disabled.',
    },
    PASSWORD_RESET_REQUIRED: {
        status: 403,
        code: '4033',
        th: 'ต้องรีเซ็ตรหัสผ่านของคุณก่อนเข้าสู่ระบบ',
        en: 'Password reset is required before you can log in.',
    },
    RATE_LIMIT_EXCEEDED: {
        status: 429,
        code: '4291',
        th: 'คุณเกินขีดจำกัดการทำรายการ กรุณารอแล้วลองใหม่อีกครั้ง',
        en: 'You have exceeded the rate limit. Please wait and try again later.',
    },
    INVALID_INPUT: {
        status: 400,
        code: '4002',
        th: 'ข้อมูลที่คุณป้อนไม่ถูกต้อง',
        en: 'The input provided is invalid.',
    },
    RESOURCE_LOCKED: {
        status: 423,
        code: '4230',
        th: 'ทรัพยากรถูกล็อค',
        en: 'The resource is locked.',
    },
    PRECONDITION_FAILED: {
        status: 412,
        code: '4120',
        th: 'ไม่ผ่านเงื่อนไขที่กำหนด',
        en: 'Precondition failed.',
    },
    INSUFFICIENT_PRIVILEGES: {
        status: 403,
        code: '4034',
        th: 'คุณไม่มีสิทธิ์เพียงพอที่จะดำเนินการนี้',
        en: 'You do not have sufficient privileges to perform this action.',
    },
    INVALID_API_KEY: {
        status: 401,
        code: '4014',
        th: 'คีย์ API ไม่ถูกต้อง',
        en: 'The API key provided is invalid.',
    },
    SESSION_EXPIRED: {
        status: 401,
        code: '4015',
        th: 'เซสชันหมดอายุ',
        en: 'Your session has expired.',
    },
    MISSING_PARAMETERS: {
        status: 400,
        code: '4003',
        th: 'มีพารามิเตอร์ที่หายไป',
        en: 'Required parameters are missing.',
    },
    INVALID_SIGNATURE: {
        status: 401,
        code: '4016',
        th: 'ลายเซ็นไม่ถูกต้อง',
        en: 'The signature provided is invalid.',
    },
    UNSUPPORTED_OPERATION: {
        status: 400,
        code: '4004',
        th: 'การดำเนินการนี้ไม่รองรับ',
        en: 'This operation is not supported.',
    },
};

const enhanceResponsePrototype = (res) => {
    if (!res.module) {
        res.module = function (module = 'GENERAL') {
            this.locals.moduleKey = module;
            return this;
        };
    }

    if (!res.errorKey) {
        res.errorKey = function (key = 'GENERAL') {
            this.locals.errorKey = key;
            return this;
        };
    }

    if (!res.error) {
        res.error = function (config = {}, data = {}) {
            const { language = 'th', errorKey = 'GENERAL', moduleKey = 'GENERAL' } = this.locals;
            const { key = errorKey, module = moduleKey, messages = [], override = true } = config;
            const errorMap = ERROR_MESSAGE_MAP[key] || ERROR_MESSAGE_MAP.GENERAL;
            const moduleCode = MODULE_CODE[module] || MODULE_CODE.GENERAL;
            const { status } = errorMap;
            const messageLabels = messages.length && override ? messages : [errorMap[language], ...messages];

            return this.status(status).json({
                status,
                code: `${moduleCode}${errorMap.code}`,
                message: messageLabels.join(', '),
                messages: messageLabels,
                responseDate: new Date(),
                ...data,
            });
        };
    }

    if (!res.success) {
        res.success = function (data = {}) {
            const { newToken, moduleKey = 'GENERAL' } = this.locals;
            const moduleCode = MODULE_CODE[moduleKey] || MODULE_CODE.GENERAL;

            return this.status(200).json({
                status: 200,
                code: `${moduleCode}0000`,
                ...(newToken ? { token: newToken } : {}),
                ...data,
                responseDate: new Date(),
            });
        };
    }
};

class ResponseMapError extends Error {
    constructor(message, errorMessageType = 'GENERAL') {
        super(message);
        this.errorMessageType = errorMessageType;
    }
}

module.exports = {
    enhanceResponsePrototype,
    ResponseMapError,
};
