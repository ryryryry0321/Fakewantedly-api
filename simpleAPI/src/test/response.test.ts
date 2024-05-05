
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

// HTTPリクエストを行う関数(id別)
const fetchToRecruit = async () => {
    const res = await fetch("http://localhost:3000/api/v1/recruit/2");

    if (!res.ok) {
        throw new Error('Failed to fetch recruit');
    }
    const data: RecruitInfo = await res.json();
    return data;
};

// ユーザー定義型ガードメソッド
// レスポンスがRecruitInfo型かどうか判定する。
const isRecruitInfo = (item: any): item is RecruitInfo =>{

    const forcedCastItem = item as RecruitInfo;
    // 募集タイトルと業務内容があればRecruitInfo型として判定する。
    return !!forcedCastItem?.needs_title && !!forcedCastItem?.work_context;
}

// PASSED
describe("レスポンスのオブジェクトがRecruitInfo型かテスト", () => {
    it("check type", async () => {
        const response = await fetchToRecruits();

        response.forEach((actual:RecruitInfo, i)=>{
            expect(isRecruitInfo(actual)).toBe(true)
        })
    });
});

// PASSED
describe("レスポンスのオブジェクトがRecruitInfo型かテスト(id別)", () => {
    it("check type", async () => {
        const response = await fetchToRecruit();
        expect(isRecruitInfo(response)).toBe(true);
    });
});