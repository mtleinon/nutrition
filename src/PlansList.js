import React, { useContext } from 'react';
import Plan from './Plan';
import { PlanContext } from './context/plan.context';
import { ShowContext } from './context/show.context';
import { PlanDispatchContext } from './context/plan.context';
import { ShowDispatchContext } from './context/show.context';
import uuidv1 from 'uuid/v1';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import { MdExpandLess } from 'react-icons/md';
import { MdExpandMore } from 'react-icons/md';
import { MdDetails } from 'react-icons/md';

export default function PlansList() {
  const planDispatch = useContext(PlanDispatchContext);
  const showDispatch = useContext(ShowDispatchContext);
  const plans = useContext(PlanContext);
  const show = useContext(ShowContext);

  const toggleShowPlans = () => {
    showDispatch({
      type: 'TOGGLE_SHOW',
      listName: 'showPlans'
    });
  };

  return (
    <div
      className={
        'planListColor planList' + (show.showPlans ? '' : ' closedList')
      }
      // style={{ height: show.showPlans ? '100%' : '1.8rem' }}
    >
      <div className="listTitleRow">
        <div className="listTitle">Plans</div>
        <div className="icons">
          {show.showPlans ? (
            <IconWithTooltip tooltipText="Hide plans">
              <MdExpandLess className="icon" onClick={toggleShowPlans} />
            </IconWithTooltip>
          ) : (
            <IconWithTooltip tooltipText="Show plans">
              <MdExpandMore className="icon" onClick={toggleShowPlans} />
            </IconWithTooltip>
          )}
          <IconWithTooltip tooltipText="Add new plan">
            <MdAddCircle
              className="icon"
              style={{ color: 'green' }}
              onClick={() =>
                planDispatch({
                  type: 'ADD',
                  plan: {
                    id: uuidv1(),
                    editMode: false,
                    name: 'new plan',
                    meals: []
                  }
                })
              }
            />
          </IconWithTooltip>
        </div>
      </div>
      {show.showPlans && (
        <div className="planListContainerColor listContainer">
          <ul>
            {plans.map(plan => (
              <Plan key={plan.id} plan={plan} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
