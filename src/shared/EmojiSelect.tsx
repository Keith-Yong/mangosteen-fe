/**封装表情列表数据 */
import { computed, defineComponent, PropType, ref } from "vue";
import { emojiList } from "./emojiList";
import s from './EmojiSelect.module.scss';

export const EmojiSelect =defineComponent({
    props: {
        modelValue: {
          type: String as PropType<string>
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
        // //  ??？？
        // const emojis = selectedItem.map( category => emojiList.find(item => item[0] === category)?.[1].map(item => <li>{item}</li>)

        // )
       /**这几个函数的作用??？？ */
        const onClickTab = (index: number) => {
            refSelected.value = index
        }
        const onClickEmoji = (emoji:string) => {
                context.emit('update:modelValue',emoji)//不懂context
        }

        const emojis = computed( () => {
            const selectedItem = table[refSelected.value][1] 
            return selectedItem.map(category =>
                emojiList.find(item => item[0] === category)?.[1]
                  .map(item => <li class={item === props.modelValue ? s.selectedEmoji : ''}
                    onClick={() => onClickEmoji(item)}>{item}</li>)
              )
        })

        return () => (
            <div class={s.emojiList}>
                <nav>
                    {/* table获取每一项tag的名称 用span标签的形式导出*/}
                    {table.map( (item, index) => {
                        <span class={index === refSelected.value ? s.selected : ''}
                        onClick={() => onClickTab(index)}>{item[0]}</span>
                    })}
                </nav>
                <ol>
                    {/* emojis通过计算属性后成为响应式数据需要.value才能获取它的值*/}
                    
                    {emojis.value}
                </ol>
            </div>
          )
      }
})