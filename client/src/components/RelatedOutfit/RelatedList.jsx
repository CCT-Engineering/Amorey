import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import global from '../../styles/global.css';
import RelatedCard from './RelatedCard.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const RelatedList = ({
  current, CurMeta, setCurrent, setCurStars, calculateAverageStars,
  setMetadata, darkMode, setCurrentStyles, relateArr,
}) => {
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(0);
  const [cards, setCards] = useState({
    0: null, 1: null, 2: null, 3: null, 4: null,
  });

  useEffect(() => {
    const temp1 = document.getElementsByClassName('related-card');
    const temp2 = document.getElementsByClassName('table-content');
    const temp3 = document.getElementsByClassName('stars');
    for (let i = 0; i < temp1.length; i += 1) {
      if (darkMode) {
        temp1[i]?.classList?.replace(local.relatedCard, local.relatedCardDark);
        temp2[i]?.classList?.replace(local.tableContent, local.tableContentDark);
        temp3[i]?.classList?.replace(global.stars, global.starsDark);
      } else {
        temp1[i]?.classList?.replace(local.relatedCardDark, local.relatedCard);
        temp2[i]?.classList?.replace(local.tableContentDark, local.tableContent);
        temp3[i]?.classList?.replace(global.starsDark, global.stars);
      }
    }
  }, [darkMode, cards]);

  const updateTheme = () => {
    const tempCard3 = document.getElementsByClassName('table-content');
    for (let i = 0; i < tempCard3.length; i += 1) {
      if (darkMode) {
        tempCard3[i]?.classList?.replace(local.tableContent, local.tableContentDark);
      } else if (!darkMode) {
        tempCard3[i]?.classList?.replace(local.tableContentDark, local.tableContent);
      }
    }
  };

  const build = (relateOneId, index) => {
    const temp = cards;
    temp[index] = (
      (
        <RelatedCard
          key={`${index + current.id}`}
          relateOneId={relateOneId}
          current={current}
          CurMeta={CurMeta}
          setCurrent={setCurrent}
          setCurStars={setCurStars}
          calculateAverageStars={calculateAverageStars}
          setMetadata={setMetadata}
          setCurrentStyles={setCurrentStyles}
          darkMode={darkMode}
          setCards={setCards}
          updateTheme={updateTheme}
        />
      )
    );
    setCards(temp);
  };

  const buildOne = (relatedOne) => (
    (
      <RelatedCard
        key={`${current.id + relatedOne}`}
        relateOneId={relatedOne}
        current={current}
        CurMeta={CurMeta}
        setCurrent={setCurrent}
        setCurStars={setCurStars}
        calculateAverageStars={calculateAverageStars}
        setMetadata={setMetadata}
        darkMode={darkMode}
        setCurrentStyles={setCurrentStyles}
        setCards={setCards}
      />
    )
  );

  useEffect(() => {
    if (relateArr.length > 5) {
      const overflow = relateArr.length - 5;
      const calcStart = Math.floor(overflow / 2);
      setViewStart(calcStart);
      setViewEnd(calcStart + 5);
      const copy = relateArr.slice(calcStart, calcStart + 5);
      copy.map((id, index) => build(id, index));
    } else {
      setViewStart(0);
      setViewEnd(relateArr.length);
      relateArr.map((id, index) => build(id, index));
    }
  }, [relateArr]);

  const preClick = (event) => {
    event.preventDefault();
    const newCards = {
      0: null, 1: cards[0], 2: cards[1], 3: cards[2], 4: cards[3],
    };
    newCards[0] = buildOne(relateArr[viewStart - 1]);
    setViewStart(viewStart - 1);
    setViewEnd(viewEnd - 1);
    setCards(newCards);
  };

  const nextClick = (event) => {
    event.preventDefault();
    const newCards = {
      0: cards[1], 1: cards[2], 2: cards[3], 3: cards[4], 4: null,
    };
    newCards[4] = buildOne(relateArr[viewEnd]);
    setViewStart(viewStart + 1);
    setViewEnd(viewEnd + 1);
    setCards(newCards);
  };

  return (
    <div className={local.carousel}>
      <div className={local.related}>
        <div
          role="button"
          tabIndex={0}
          className={local.prevRel}
          onClick={(e) => preClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewStart === 0 ? null : <div>&lt;</div>}
        </div>

        <div
          role="button"
          tabIndex={0}
          className={local.nextRel}
          onClick={(e) => nextClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewEnd < relateArr.length && relateArr.length > 5 ? <div>&gt;</div> : null}
        </div>
        {cards[0]}
        {cards[1]}
        {cards[2]}
        {cards[3]}
        {cards[4]}
      </div>
    </div>
  );
};

export default RelatedList;
