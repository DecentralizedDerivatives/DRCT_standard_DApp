import CashOutFormContainer from '../../components/CashOutFormContainer';
import { sendCashOutRequest } from '../../actions/userActions';

jest.mock('../../actions/userActions');
sendCashOutRequest.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<CashOutFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<CashOutFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles submit', () => {
    const { wrapper } = setup();

    wrapper.find('CashOutFormComponent').simulate('submit');

    expect(sendCashOutRequest).toBeCalledTimes(1);
  });
});
