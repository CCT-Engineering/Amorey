import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import global from '../../styles/global.css';

const CompareTable = ({
  handleToggle, current, rel1Info, curMeta, rel1Meta,
  toggleTable, darkMode,
}) => {
  const calcRec = (meta) => {
    const rec = (
      (100 * Number(meta.recommended.true)) / (
        Number(meta.recommended.true) + Number(meta.recommended.false))
    ).toString().slice(0, 2);
    return rec;
  };

  return (
    <div className={toggleTable ? local.compareTable : local.none}>
      <div className={`table-content ${darkMode ? local.tableContentDark : local.tableContent}`}>
        {toggleTable && (
        <div className={local.tableHead}>
          <div className={global.modalLogo} aria-label="CompareTable Logo" role="img" alt="AMOREY" />
          <h4> Comparing </h4>
          <div className={local.tableProd}>
            <div>
              Current:
              {current.name}
            </div>
            <div>
              Related:
              {rel1Info.name}
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
              {rel1Info.default_price}
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              {current.created_at.slice(0, 10)}
            </div>
            <div>Release</div>
            <div>
              {rel1Info.created_at.slice(0, 10)}
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              {current.category}
            </div>
            <div>Category</div>
            <div>
              {rel1Info.category}
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              {curMeta.characteristics.Comfort
                ? curMeta.characteristics.Comfort.value.slice(0, 3) : <div>No data</div>}
              {curMeta.characteristics.Comfort ? '/5.0' : ''}
            </div>
            <div>Comfort</div>
            <div>
              {rel1Meta.characteristics.Comfort ? rel1Meta.characteristics.Comfort.value.slice(0, 3) : ''}
              {rel1Meta.characteristics.Comfort ? '/5.0' : ''}
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              {curMeta.characteristics.Quality.value.slice(0, 3)}
              /5.0
            </div>
            <div>Quality</div>
            <div>
              {rel1Meta.characteristics.Quality.value.slice(0, 3)}
              /5.0
            </div>
          </div>
          <div className={local.tableBody}>
            <div>
              {calcRec(curMeta)}
              %
            </div>
            <div>Recommended</div>
            <div>
              {calcRec(rel1Meta)}
              %
            </div>
          </div>
          <button type="button" onClick={handleToggle}>
            Close
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default CompareTable;
