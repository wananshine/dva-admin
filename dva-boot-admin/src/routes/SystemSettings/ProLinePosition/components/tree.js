import React, { useState } from 'react';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { TreeNode } = Tree;

/****************分割线************************************************/


const initTreeDate = [
    {
        title: 'Expand to load',
        key: '0',
    },
    {
        title: 'Expand to load',
        key: '1',
    },
    {
        title: 'Tree Node',
        key: '2',
        isLeaf: true,
    },
];

function updateTreeData(list, key, children) {
    return list.map(node => {
        if (node.key === key) {
            return { ...node, children };
        }
        if (node.children) {
            return { ...node, children: updateTreeData(node.children, key, children) };
        }

        return node;
    });
}

const TreeList = (props) => {
    const [treeData, setTreeData] = useState(initTreeDate);

    const onLoadData = ({ key, children }) => {
        return new Promise(resolve => {
            if (children) {
                resolve();
                return;
            }

            setTimeout(() => {
                setTreeData(origin =>
                    updateTreeData(origin, key, [
                        {
                            title: 'Child Node',
                            key: `${key}-0`,
                        },
                        {
                            title: 'Child Node',
                            key: `${key}-1`,
                        },
                    ]),
                );
                resolve();
            }, 1000);
        });
    }

    return <Tree loadData={onLoadData} treeData={treeData} />;
}


/****************分割线************************************************/

// {
//     createBy: "admin123"
//     createTime: "2020-05-14 17:34:32"
//     cssClass: null
//     dataScope: null
//     default: false
//     dictCode: 100
//     dictLabel: "30"
//     dictSort: 0
//     dictType: "warehouse_line"
//     dictValue: "30"
//     isDefault: "N"
//     listClass: null
//     params: {}
//     remark: "产线-30"
//     searchValue: null
//     status: "0"
//     updateBy: null
//     updateTime: null
// }

const TreeList2 = (props)=>{

    const { productLine, dispatch } = props;
    const { proLine  } = productLine;
    const { rows } = proLine && proLine.pageData || {};

    console.log('TreeList2--props:', props);

    const onSelect = (selectedKeys, info) => {
        dispatch({
            type: 'DataProduct/getPageInfo',
            payload: {}
        })
        console.log('selected', selectedKeys, info);
    };

    const treeData = rows && rows.map((v, i)=>{
        return {
            title: v.remark,
            key: v.dictCode,
            children: []
        }
    });

    return (
        <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            treeData={treeData}
            onSelect={()=>{ onSelect() }}
        />
    );
}


/****************分割线************************************************/


export default TreeList;
export {
    TreeList2
}