import type { UserDetails } from '../actions/user.actions';

const userDetailsSelector = (state) : UserDetails => state.user.userDetails;
export default userDetailsSelector;
