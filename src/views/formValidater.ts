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
    const EMAIL_RULE: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const PW_RULE: RegExp = /^[A-Za-z0-9]{6,12}$/;

    if(stuff.name.length < 2) {
        error += "이름은 2자 이상이어야 합니다. \n"
    }
    if(stuff.nickname.length < 2) {
        error += "별명은 2자 이상이어야 합니다. \n"
    }
    if(stuff.password.length < 4) {
        error += "비밀번호는 4자 이상이어야 합니다. \n"
    }
    if(!PW_RULE.test(stuff.password)) {
        error += "비밀번호는 영문, 숫자, 특수문자의 조합으로 구성되어야 합니다. \n"
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
        error += "이메일 형식이 올바르지 않습니다. \n"
    }
    if(stuff.birth) {
        error += "이메일은 태어난년-몇월-몇일의 형식으로 입력되어야 합니다. \n"
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