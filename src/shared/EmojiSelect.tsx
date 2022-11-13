/**封装表情列表数据 */
import { computed, defineComponent, PropType, ref } from "vue";
import { emojiList } from "./emojiList";
import s from './EmojiSelect.module.scss';

export const EmojiSelect =defineComponent({
    props: {
        modelValue: {
          type: String
        }
      },
      setup: (props, context) => {
        console.log(emojiList)
        const refSelected = ref(1)  //
        /** table的类型是？？??*/
        // face-smiling在EmojiSelect组件中是？？??这个table的作用是什么，为什么要这样定义
        const table: [string,string[]] [] = [
            ['表情',[
                'face-smiling','face-affection','face-tongue', 'face-hand',
                'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
                'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
            ]
        ],
            ['手势',[
                'hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
            'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts'
            ]
        ],
            ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
            'person-activity', 'person-sport', 'person-resting']],
            ['衣服', ['clothing']],
            ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
                'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
            ['植物', ['plant-flower', 'plant-other']],
            ['自然', ['sky & weather', 'science']],
            ['食物', [
                'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
                'food-marine', 'food-sweet'
            ]],
            ['运动', ['sport', 'game']],

        ]
        // const selectedItem = table[refSelected.value][1] // ??？？
        // 
        // const emojis = selectedItem.map( category => emojiList.find(item => item[0] === category)?.[1].map(item => <li>{item}</li>)

        // )
       /**调用该函数会把表情列表的下标转换为可响应式变量 */
        const onClickTab = (index: number) => {
            refSelected.value = index
        }
        // onClickEmoji函数绑定单个元素，使成为父子间可以传递的属性
        const onClickEmoji = (emoji:string) => {
                context.emit('update:modelValue',emoji) //emoji发生变化，通知父组件上v-model的数据也要变化
        }
// ["\u{1F600}", "\u{1F603}", "\u{1F604}", "\u{1F601}", "\u{1F606}", "\u{1F605}", "\u{1F923}", "\u{1F602}", "\u{1F642}", "\u{1F643}", "\u{1FAE0}", "\u{1F609}", "\u{1F60A}", "\u{1F607}"]
// [<li class="xx">\u{1F600}</li>,  ] 

//  逻辑：返回表情列表，并使之成为计算属性，这样值发生变化，会自动计算结果
const emojis = computed( () => {
            const selectedItem = table[refSelected.value][1]  //获取table表情的列表
            return selectedItem.map(category => //和表情组件中的类别做比较，
                emojiList.find(item => item[0] === category)?.[1]
                  .map(item => <li class={item === props.modelValue ? s.selectedEmoji : ''}//给满足条件的表情类别添加样式，不满足的不添加
                    onClick={() => onClickEmoji(item)}>{item}</li>)//点击的表情触发onClickEmoji函数
              )
        })

        return () => (
            <div class={s.emojiList}>
                {/* table获取每一项tag的名称 用span标签的形式导出*/}
                <nav>
                   
                    {table.map((item, index) =>
                    <span class={index === refSelected.value ? s.selected : ''}
                        onClick={() => onClickTab(index)}>{item[0]}</span>)}
                </nav>
                <ol>
                    {/* emojis通过计算属性后成为响应式数据需要.value才能获取它的值*/}
                    { [3,4,5] }
                    {emojis.value}
                </ol>
            </div>
          )
      }
})