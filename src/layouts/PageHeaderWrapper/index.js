import React from 'react';
import { Link, withRouter } from 'dva/router';
import PageHeader from '@/components/PageHeader';
import { connect } from 'dva';
import GridContent from './GridContent';
// import styles from './index.less';
import MenuContext from '@/layouts/MenuContext';

const PageHeaderWrapper = ({
  children,
  contentWidth,
  wrapperClassName,
  top,
  location: { pathname },
  ...restProps
}) => (
    <div>
      {top}
      {pathname !== '/welcome' && (
        <MenuContext.Consumer>
          {value => (
          <PageHeader
            wide={contentWidth === 'Fixed'}
            home="首页"
            {...value}
            key="pageheader"
            {...restProps}
            linkElement={Link}
            itemRender={(item) => {
            return item.name;
            }}
          />
          )}
        </MenuContext.Consumer>
      )}
      {children ? (
        <div>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
);

export default connect(({ setting }) => ({
    contentWidth: setting.contentWidth,
}))(withRouter(PageHeaderWrapper));
