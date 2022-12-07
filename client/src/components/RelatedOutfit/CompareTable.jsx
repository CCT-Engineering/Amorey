import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';

const CompareTable = ({
  handleToggle, current, info, style
}) => {
  // console.log('current in compare table', current);
  return (
    <div className={local.compareTable}>
      <div className={local.tableContent}>
        <div className={local.tableHead}>
          <h4> Comparing </h4>
          <div className={local.tableProd}>
            <div>
              Current:
              {current.name}
            </div>
            <div>
              Related:
              {info.name}
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              $
              {current.default_price}
            </div>
            <div>Original Price</div>
            <div>
              $
              {info.default_price}
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              {current.created_at.slice(0, 10)}
            </div>
            <div>Release</div>
            <div>
              {info.created_at.slice(0, 10)}
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              {current.category}
            </div>
            <div>Category</div>
            <div>
              {info.category}
            </div>
          </div>
          <button type="button" onClick={handleToggle}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareTable;
