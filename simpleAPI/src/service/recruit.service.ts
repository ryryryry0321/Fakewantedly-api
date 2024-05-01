import RECRUIT_INFO_DATA_LIST from "../data/recruitlist";
import RecruitInfo from "../model/recruitinfo";

export const searchRecruit = async (keyword: string): Promise<RecruitInfo[]> => {
    const selectAll = RECRUIT_INFO_DATA_LIST;
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