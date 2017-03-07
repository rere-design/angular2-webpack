export class User {
    ID: number;
    ACTIVE: string;
    EMAIL: string;
    NAME: string;
    LAST_NAME: string;
    SECOND_NAME: string;
    PERSONAL_GENDER: any;
    PERSONAL_PROFESSION: any;
    PERSONAL_WWW: any;
    PERSONAL_BIRTHDAY: any;
    PERSONAL_PHOTO: string;
    PERSONAL_ICQ: string|number;
    PERSONAL_PHONE: string|number;
    PERSONAL_FAX: string|number;
    PERSONAL_MOBILE: string|number;
    PERSONAL_PAGER: string;
    PERSONAL_STREET: string;
    PERSONAL_CITY: string;
    PERSONAL_STATE: string;
    PERSONAL_ZIP: any;
    PERSONAL_COUNTRY: any;
    WORK_COMPANY: any;
    WORK_POSITION: any;
    UF_DEPARTMENT: any;
    UF_INTERESTS: any;
    UF_SKILLS: any;
    UF_WEB_SITES: any;
    UF_XING: any;
    UF_LINKEDIN: any;
    UF_FACEBOOK: string;
    UF_TWITTER: string;
    UF_SKYPE: string;
    UF_DISTRICT: any;
    UF_PHONE_INNER: string|number;

    username() {
        return this.LAST_NAME + ' ' + this.NAME;
    }
}
