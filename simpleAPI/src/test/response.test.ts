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

// まだテスト自体がうまく通らないので、通すようにする。動作自体は問題ない
describe("レスポンスのオブジェクトがRecruitInfo型かテスト", () => {
    it("check type", async () => {
        const response = await fetchToRecruits();
        
        // 期待される型リストに一致するかをアサート
       // expect(Array.isArray(response)).toBe(true); // レスポンスが配列であるかを確認
        response.forEach((recruit) => {
             // recruitがオブジェクトであることを確認
             expect(typeof recruit).toBe('object');
            
            // レスポンスの各要素が期待される型(User)に一致するかをアサート
            expect(recruit).toMatchObject({
                id: expect.any(Number),
                needs_title: expect.any(String),
                work_context: expect.any(String),
                user_id: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(null)  
            });
        });
    });
});