import {
  INVALIDATE_TOPICLIST,
  REQUEST_TOPICLIST,
  RECEIVE_TOPICLIST
} from '../../constants/ActionTypes';

// map the fields of `type` to more clear names
function getMappedTypeList(list) {
  if (!list) { return []; }

  return list.map((item, index) => {
    return {
      typeId: item.classificationType_id,
      typeName: item.classificationType_name
    };
  });
}

export default function topicList(state = {
  // indicate fetching via pull to refresh
  isRefreshing: false,
  // indicate fetching via end reached
  isEndReached: false,
  didInvalidate: false,
  boardId: null,
  list: [],
  typeList: [],
  hasMore: false,
  page: 0
}, action) {
  switch (action.type) {
    case INVALIDATE_TOPICLIST:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_TOPICLIST:
      return Object.assign({}, state, {
        isRefreshing: !action.isEndReached,
        isEndReached: action.isEndReached,
        didInvalidate: false
      });
    case RECEIVE_TOPICLIST:
      if (action.topicList.page !== 1) {
        action.topicList.list = state.list.concat(action.topicList.list);
      }

      return Object.assign({}, state, {
        isRefreshing: false,
        isEndReached: false,
        didInvalidate: false,
        boardId: action.boardId,
        list: action.topicList.list,
        typeList: getMappedTypeList(action.topicList.classificationType_list),
        hasMore: !!action.topicList.has_next,
        page: action.topicList.page
      });
    default:
      return state;
  }
}
