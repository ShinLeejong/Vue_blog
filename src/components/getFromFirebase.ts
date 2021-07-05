import { db } from "../firebase.js"
import { storage } from "../firebase.js"

export default (reference: string, avatar?: boolean, orderBy?: string, limit?: number, orderDirection = 'asc'): Record<string, unknown>[] => {

    const arr: Record<string, unknown>[] = [];
    let getDatas;

    const ref = db.collection(reference);

    // need optimization

    if(orderBy === undefined) getDatas = ref.get();
    else if(orderBy !== undefined && limit === undefined) {
        if(!orderDirection) getDatas = ref.orderBy(orderBy).get();
        else getDatas = ref.orderBy(orderBy, orderDirection).get();
    }
    else {
        if(!orderDirection) getDatas = ref.orderBy(orderBy).limit(limit).get();
        else getDatas = ref.orderBy(orderBy, orderDirection).get();
    }

    getDatas.then(res => {
        res.docs.forEach((ele) => {
            if(avatar === true) {
                storage
                    .ref(`${reference}/${ele.data().profilePicture}`)
                    .getDownloadURL()
                    .then(url => {
                        arr.push({
                            ...ele.data(),
                            avatar: url
                        });
                    })
                    .catch(err => console.error(err))
            } else {
                arr.push({
                    ...ele.data(),
                })
            }
        })
    })
    .catch(err => console.error(err));

    return arr;
}