const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// First Principle of redux - the state is a SINGLE global object - which is available in the redux store and our App is always subscribed to

// Second Principle of redux - the state can only be changed by dispatching an action e.g. BUY_CAKE

// Third Principle of redux - the state can only be transformed by an action writing a pure Reducers i.e. a function that takes in the previous state and action as an input an returns the new state e.g. (prevState, action) => newState

/* 
const reducer = (state, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				numOfCakes: state.numOfCakes - 1,
			};
	}
};
 */

//ACTIONS
// An action is an object with a type property

// An action creator is an object that returns an action

const BUY_CAKE = "BUY_CAKES";
const BUY_ICECREAM = "BUY_ICECREAM";

const buyCake = () => {
	return {
		type: BUY_CAKE,
		info: "First redux action",
	};
};

const buyIceCreams = () => {
	return {
		type: BUY_ICECREAM,
		info: "First redux action",
	};
};

//REDUCERS
//(prevState, action) => newState

// const initialState = {
// 	numOfCakes: 10,
// 	numOfIceCreams: 20,
// };

const initialCakeState = {
	numOfCakes: 10,
};

const initialIceCreamState = {
	numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1,
			};
		default:
			return state;
	}
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
	switch (action.type) {
		case BUY_ICECREAM:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams - 1,
			};

		default:
			return state;
	}
};

const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log(store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());

unsubscribe();
