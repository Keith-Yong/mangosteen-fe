import { AxiosResponse } from "axios";
import { onMounted, ref } from "vue";

// 声明Fetcher的类型为Promise类型
type Fetcher = (page:number) => Promise<AxiosResponse<Resources<Tag>>>

export const  useTags = (fetcher:Fetcher) => {
    const page = ref(0)
    const hasMore = ref(false)
    const tags = ref<Tag[]>([])
    const fetchTags = async () => {
        const response = await fetcher(page.value)
        const { resources, pager} = response.data
        tags.value.push(...resources)
        // 页数乘以每页数量加最后一页的数量,和总数对比,返回布尔值
        hasMore.value = ((pager.page - 1) * pager.per_page + resources.length) < pager.count 
        page.value += 1
    }
    onMounted(fetchTags)
   return { page ,hasMore ,tags ,fetchTags}



}