import RECRUIT_INFO_DATA_LIST from "../data/recruitlist";
import RecruitInfo from "../model/recruitinfo";

const selectAll = RECRUIT_INFO_DATA_LIST;

/**
 * キーワード検索
 * 
 * @param keyword 募集を検索するキーワード
 * @returns 募集情報のリスト
 */
export const searchRecruit = async (keyword: string): Promise<RecruitInfo[]> => {

    // 検索結果のリストのいれもの
    let resultList: RecruitInfo[] = [];

    // 回して一致したものを検索結果リストにつめていく(DB連携の場合はSQLクエリのパラムにクエリパラムをあてる)
    selectAll.forEach((recruitInfo: RecruitInfo, i: number) => {
        if (recruitInfo.needs_title.includes(keyword)) {
            resultList.push(recruitInfo)
        } else if (recruitInfo.work_context.includes(keyword)) {
            resultList.push(recruitInfo);
        }
    })

    return resultList;
}

/**
 * id別検索
 * 
 * @param id 募集データID
 * @returns 募集情報(単体)
 */
export const findById = (id: number): RecruitInfo | undefined => {
    // find メソッドは、指定した条件を満たす最初の要素を配列から返します
    return selectAll.find((recruitInfo) => recruitInfo.id == id);
}