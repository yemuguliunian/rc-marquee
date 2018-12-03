# rc-marquee
文字滚动

### demo
https://yemuguliunian.github.io/rc-marquee/doc/index.html#/demo

### 使用示例
```javascript
import Marquee from 'Marquee';

<Marquee space={100} speed={10} delay={3000} scrollType="hover">
    领域驱动设计的核心是“领域”，因此要运用领域驱动设计，从一开始就要让团队走到正确的点上。当我们组建好了团队之后，应该从哪里开始？不是UI原型设计，不是架构设计，不是设计数据库，这些事情重要却非最高优先级。
 </Marquee>
```

### API
| 参数        | 说明           | 类型  | 默认值 |
| ------------- |-------------| -----|-----|
| className     | className | string  | |
| style     | style | object  | |
| delay     | 延迟滚动(ms) | number  | 1000 |
| speed     | 滚动速度 | number  | 20 |
| space     | 滚动衔接的间距(px) | number  | 30 |
| scrollType  | 滚动模式('auto'\|'hover') | string  | auto |
