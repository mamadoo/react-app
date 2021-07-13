import { useSelector, useDispatch } from 'react-redux';

import { increment, decrement, incrementAsync } from './features/counter/counterSlice';

export default function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementAsync(5))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
