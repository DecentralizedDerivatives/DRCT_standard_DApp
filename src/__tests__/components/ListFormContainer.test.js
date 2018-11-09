// COMPLETE
import ListFormContainer, {
  validate,
} from '../../components/ListFormContainer';
import { sendListOrder } from '../../actions/orderActions';

jest.mock('../../actions/orderActions');
sendListOrder.mockImplementation(() => () => {});

function setup(overrides) {
  const store = initFixtureStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<ListFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<ListFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles submit', () => {
    const { wrapper } = setup();

    wrapper.find('ListFormComponent').simulate('submit', {});

    expect(sendListOrder).toBeCalledTimes(1);
  });

  it('validates values', () => {
    const incorrect = {};
    const correct = { token: '0x000...', price: '1', tokenAmount: '1' };

    expect(validate(incorrect)).toMatchSnapshot();
    expect(validate(correct)).toMatchSnapshot();
  });
});
