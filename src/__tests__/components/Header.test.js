import Header from '../../components/Header';

describe('<Header />', () => {
  it('renders the component', () => {
    const wrapper = shallow(
      <Header isConnected={false} whiteListed={false} store={initStore()} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders connected not whitelisted', () => {
    const wrapper = shallow(
      <Header isConnected={true} whiteListed={false} store={initStore()} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders connected and whitelisted', () => {
    const showTerms = jest.fn();

    const wrapper = shallow(
      <Header isConnected={true} whiteListed={true} store={initStore()} />
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.find('.hamburger-btn').simulate('click');

    wrapper.find('#mobile-nav p').simulate('click', {preventDefault: () => undefined});

    wrapper.setProps({showTerms: showTerms});
    wrapper.find('#mobile-nav p').simulate('click', {preventDefault: () => undefined});
    expect(showTerms).toBeCalledTimes(1);
  });
});
