interface Stuff {
    name: string,
    nickname: string,
    password: string,
    profilePicture: File,
    role: string,
    sex: string,
    email: string,
    hobby: string,
    birth: string,
    age: number
}

export const formValidator = (stuff: Stuff) => {
    let error: string;
    error = '';
    const EMAIL_RULE = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const BIRTH_RULE = /^[1-2]{1}[0-9]{3}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/g;

    if(stuff.name.length < 2) {
        error += "이름은 2자 이상이어야 합니다. \n"
    }
    if(stuff.nickname.length < 2) {
        error += "별명은 2자 이상이어야 합니다. \n"
    }
    if(stuff.password.length < 4) {
        error += "비밀번호는 4자 이상이어야 합니다. \n"
    }
    if(!stuff.profilePicture) {
        error += "배경 사진은 반드시 입력되어야합니다. \n"
    }
    if(!stuff.role.length) {
        error += "역할을 적어주세요. \n"
    }
    if(!stuff.sex) {
        error += "성별을 선택해주세요. \n"
    }
    if(!EMAIL_RULE.test(stuff.email)) {
        error += "이메일 형식이 올바르지 않습니다. \n"
    }
    if(!stuff.hobby) {
        error += "취미를 적어주세요. \n"
    }
    if(!BIRTH_RULE.test(stuff.birth)) {
        error += "생년월일의 형식이 올바르지 않습니다. \n"
    }
    if(stuff.age <= 0 || stuff.age > 110) {
        error += "생일의 년도가 말이 되지 않습니다. \n"
    }
    if(error !== '') {
        error = "올바르지 않게 입력되었습니다. 오류는 다음과 같습니다. \n\n" + error;
        alert(error);
        return false;
    }
    return true;
}