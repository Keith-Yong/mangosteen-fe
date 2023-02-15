import { Icon } from '../../shared/Icon';
import { defineComponent, PropType, ref } from "vue";
import { http } from "../../shared/Http";
import { useTags } from "../../shared/useTags";
import { Button } from '../../shared/Button';
import s from './Tags.module.scss';
import { RouterLink, useRouter } from 'vue-router';
import { time } from 'echarts';

export const Tags = defineComponent({
    props: {
        kind: {
            type: String as PropType<string>, // 定义props的属性kind
            required: true
          },
          selected: Number
    },
    emits: ['update:selected'],
    setup: (props, context) => {
        const {tags ,hasMore, page ,  fetchTags} = useTags((page) => {
            return http.get<Resources<Tag>>('/tags', {
                kind: props.kind,
                page: page +1,
              }, {
                _mock:'tagIndex',
                _autoLoading: true,
            })
        })

        const onSelect = (tag: Tag) => {
          context.emit('update:selected', tag.id)
        };

        const timer = ref<number>()
        const currentTag = ref<HTMLDivElement>()
        const router = useRouter()
        const onLongPress = ( tagId: Tag['id']) => {
          router.push(`/tags/${tagId}/edit?kind=${props.kind}`)
        }

        // 触发时开始计时
        const onTouchStart = (e:TouchEvent, tag:Tag) => {
          currentTag.value = e.currentTarget as HTMLDivElement
          timer.value = setTimeout(() => {
            onLongPress(tag.id)
          }, 500);
        }

        const onTouchEnd = (e:TouchEvent) => {
          clearTimeout(timer.value)
        }

        //获取e.target移动后没有变化，用document.elementFromPoint方法，传touches的clientX和Y可以获取到点击时的元素，并且移动时也能获取到改变的元素
        const onTouchMove = (e:TouchEvent) => {
          const pointedElement = document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY)
          if(currentTag.value !== pointedElement && 
            currentTag.value?.contains(pointedElement) === false){
              clearTimeout(timer.value)
            }
        }



        return () => <>
        {/*  为什么要在这里添加一个Div，再触发函数事件 */}
        <div class={s.tags_wrapper}  onTouchmove={onTouchMove}>
        {/* 把kind属性添加到路径的查询参数上拼接 */}
          <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name}>新增</div>
            </RouterLink>
          
          {tags.value.map(tag =>
              <div class={[s.tag, props.selected === tag.id ? s.selected : '']}
              onClick={() => onSelect(tag)}
              onTouchstart={ (e)=>onTouchStart(e, tag)}
              onTouchend={onTouchEnd}
            >
              <div class={s.sign}>
                {tag.sign}
              </div>
              <div class={s.name}>
                {tag.name}
              </div>
            </div>
          )}
        </div>
        <div class={s.more}>
          {hasMore.value ?
            <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> :
            <span class={s.noMore}>没有更多</span>
          }
        </div>
        </>
    }
})