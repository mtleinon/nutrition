import React, { useContext } from 'react';
import Plan from './Plan';
import { PlanContext } from './context/plan.context';
import { ShowContext } from './context/show.context';
import { PlanDispatchContext } from './context/plan.context';
import { ShowDispatchContext } from './context/show.context';
import uuidv1 from 'uuid/v1';
import IconWithTooltip from './IconWithTooltip';
import { MdAddCircle } from 'react-icons/md';
import { MdDetails } from 'react-icons/md';

export default function PlansList() {
  const planDispatch = useContext(PlanDispatchContext);
  const showDispatch = useContext(ShowDispatchContext);
  const plans = useContext(PlanContext);
  const show = useContext(ShowContext);
  return (
    <div>
      <div className="listTitleRow">
        <div className="listTitle">Plans</div>
        <div className="icons">
          <IconWithTooltip tooltipText="Show plans">
            <MdDetails
              className="icon"
              style={{ color: 'green' }}
              onClick={() =>
                showDispatch({
                  type: 'TOGGLE_SHOW',
                  listName: 'showPlans'
                })
              }
            />
          </IconWithTooltip>
          <IconWithTooltip tooltipText="Show plans">
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
        <ul>
          {plans.map(plan => (
            <Plan key={plan.id} plan={plan} />
          ))}
        </ul>
      )}
    </div>
  );
}