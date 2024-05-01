
import RecruitInfo from "../model/recruitinfo";

// HTTPリクエストを行う関数
const fetchToRecruits = async () => {
    const res = await fetch("http://localhost:3000/api/v1/recruits");

    if (!res.ok) {
        throw new Error('Failed to fetch recruits');
    }
    const data: RecruitInfo[] = await res.json();
    return data;
};

// ユーザー定義型ガードメソッド
// レスポンスがRecruitInfo型かどうか判定する。
const isRecruitInfo = (item: any): item is RecruitInfo =>{

    const forcedCastItem = item as RecruitInfo;
    // 募集タイトルと業務内容があればRecruitInfo型として判定する。
    return !!forcedCastItem?.needs_title && !!forcedCastItem?.work_context;
}

// まだテスト自体がうまく通らないので、通すようにする。動作自体は問題ない
describe("レスポンスのオブジェクトがRecruitInfo型かテスト", () => {
    it("check type", async () => {
        const response = await fetchToRecruits();
        
        // TODO 同じリクエストINFO型かチェックする
        response.forEach((actual:RecruitInfo, i)=>{
            expect(isRecruitInfo(actual)).toBe(true)
        })
    });
});