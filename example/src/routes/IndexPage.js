import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';

import Marquee from '../components/marquee/index.js';

function IndexPage({dispatch, indexPage}) {

    const {
    } = indexPage;

	return (
		<div className="wrap">
			<div className="innerWrap">
				<div style={{width : '700px', marginBottom : '20px'}}>
					<Marquee>
						领域驱动设计的核心是“领域”，因此要运用领域驱动设计，从一开始就要让团队走到正确的点上。当我们组建好了团队之后，应该从哪里开始？不是UI原型设计，不是架构设计，不是设计数据库，这些事情重要却非最高优先级。
					</Marquee>
					<span>{`<Marquee>xxxx...</Marquee>`}</span>
				</div>
				<div style={{width : '700px', marginBottom : '20px'}}>
					<Marquee space={100}>
						领域驱动设计的核心是“领域”，因此要运用领域驱动设计，从一开始就要让团队走到正确的点上。当我们组建好了团队之后，应该从哪里开始？不是UI原型设计，不是架构设计，不是设计数据库，这些事情重要却非最高优先级。
					</Marquee>
					<span>{`<Marquee space={100}>xxxx...</Marquee>`}</span>
				</div>
				<div style={{width : '700px', marginBottom : '20px'}}>
					<Marquee speed={10}>
						领域驱动设计的核心是“领域”，因此要运用领域驱动设计，从一开始就要让团队走到正确的点上。当我们组建好了团队之后，应该从哪里开始？不是UI原型设计，不是架构设计，不是设计数据库，这些事情重要却非最高优先级。
					</Marquee>
					<span>{`<Marquee speed={10}>xxxx...</Marquee>`}</span>
				</div>
				<div style={{width : '700px', marginBottom : '20px'}}>
					<Marquee delay={3000}>
						领域驱动设计的核心是“领域”，因此要运用领域驱动设计，从一开始就要让团队走到正确的点上。当我们组建好了团队之后，应该从哪里开始？不是UI原型设计，不是架构设计，不是设计数据库，这些事情重要却非最高优先级。
					</Marquee>
					<span>{`<Marquee delay={3000}>xxxx...</Marquee>`}</span>
				</div>
				<div style={{width : '700px'}}>
					<Marquee scrollType="hover">
						领域驱动设计的核心是“领域”，因此要运用领域驱动设计，从一开始就要让团队走到正确的点上。当我们组建好了团队之后，应该从哪里开始？不是UI原型设计，不是架构设计，不是设计数据库，这些事情重要却非最高优先级。
					</Marquee>
					<span>{`<Marquee scrollType="hover">xxxx...</Marquee>`}</span>
				</div>
			</div>
		</div>
	)
}

export default connect(
    ({indexPage}) => ({indexPage})
)(IndexPage);