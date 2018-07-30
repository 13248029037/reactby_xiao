let initialState2 = {
  //初始化状态
  category: [],
  // age: [3, 3, 4, 34]
};

function reducer(state=initialState2, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case "getCategorys":
      return { ...state, ...payload };
    default: return state
  }
}

export default reducer;
