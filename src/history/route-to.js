import { history } from './history';

const routeTo = (route: string) => {
  history.push(route);
};
export default routeTo;
