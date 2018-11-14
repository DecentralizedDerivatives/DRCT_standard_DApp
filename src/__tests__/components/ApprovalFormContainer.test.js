import ApprovalFormContainer, {
  validate,
} from '../../components/ApprovalFormContainer';
import { sendApproveOrder } from '../../actions/orderActions';

jest.mock('../../actions/orderActions');
sendApproveOrder.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<ApprovalFormContainer {...props} />)
    .dive()
    .dive()
    .dive()
    .dive();

  return {
    wrapper,
  };
}

describe('<ApprovalFormContainer />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles submit', () => {
    const { wrapper } = setup();

    wrapper.find('ApprovalFormComponent').simulate('submit');

    expect(sendApproveOrder).toBeCalledTimes(1);
  });

  it('validates values', () => {
    const incorrect = {};
    const correct = { token: '0x000...', tokenAmount: '1' };

    expect(validate(incorrect)).toMatchSnapshot();
    expect(validate(correct)).toMatchSnapshot();
  });
});
