import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import P2Pslider from './P2Pslider';

const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('next/image', () => (props: any) => <img {...props} />);

interface LottieProps {
  className?: string;
  animationData?: any;
  loop?: boolean;
}
jest.mock('lottie-react', () => ({ className, ...props }: LottieProps) => (
  <div className={className} data-testid="lottie-animation" {...props} />
));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          sport: "NBA",
          status: "PENDING",
          created_by: {
            rank: "/rebet-assets/StaticAssets/daimond_icon.svg",
            img: "url/img",
            username: "Bob",
            bet_type: "Under",
            line: "-50",
            pick: "Bos Celtics",
            bet_amount: 1.0,
            bet_payout: 2.0,
            bet_odds: "1:1",
            bet_currency: "Rebet Cash",
          },
          received_by: {
            rank: "/rebet-assets/StaticAssets/plat_icon.svg",
            img: "url/img",
            username: "Charles",
            bet_type: "Over",
            line: "+50",
            pick: "Ny Knicks",
            bet_amount: 1.0,
            bet_payout: 2.0,
            bet_odds: "1:1",
            bet_currency: "Rebet Cash",
          },
          game: {
            date: "04 NOV",
            time: "05:15 PM",
            bet_type: "Over/Under",
            odds: "1:1",
            line: "50",
            teams: [
              {
                img: "/rebet-assets/StaticAssets/bengals_logo.webp",
                teamname: "Bos Celtics",
              },
              {
                img: "/rebet-assets/StaticAssets/cowboys_logo.webp",
                teamname: "Ny Knicks",
              },
            ],
          },
        },
      ]),
  })
) as jest.Mock;

describe('P2Pslider Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorMock.mockClear();
  });

  it('renders loading state initially', () => {
    render(<P2Pslider />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders fetched data correctly', async () => {
    render(<P2Pslider />);
    await waitFor(() => {
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('You')).toBeInTheDocument();
      expect(screen.getByText('NBA')).toBeInTheDocument();
      expect(screen.getByText('PENDING')).toBeInTheDocument();
      expect(screen.getByText('Bos Celtics')).toBeInTheDocument();
      expect(screen.getByText('Ny Knicks')).toBeInTheDocument();
      expect(screen.getByText('Under')).toBeInTheDocument();
      expect(screen.getByText('-50')).toBeInTheDocument();
      expect(screen.getByText('Over')).toBeInTheDocument();
      expect(screen.getByText('+50')).toBeInTheDocument();
      expect(screen.getByText('04 NOV')).toBeInTheDocument();
      expect(screen.getByText('05:15 PM')).toBeInTheDocument();
      expect(screen.getByText('1:1')).toBeInTheDocument();
    }, { timeout: 4000 });
  });

  it('handles API fetch error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });
    render(<P2Pslider />);
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch slides:',
        expect.objectContaining({ message: 'HTTP error! status: 500' })
      );
    }, { timeout: 2000 });
  });

  it('changes slider color to green when dragged right', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const slider = screen.getByAltText('Draggable orb');
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: 50 });
    expect(slider.closest('.orb-slider')).toHaveClass('effect--green');
    fireEvent.mouseUp(slider);
  });

  it('changes slider color to red when dragged left', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const slider = screen.getByAltText('Draggable orb');
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: -50 });
    expect(slider.closest('.orb-slider')).toHaveClass('effect--red');
    fireEvent.mouseUp(slider);
  });

  it('opens accept panel when dragged right beyond threshold', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const slider = screen.getByAltText('Draggable orb');
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: 200 });
    fireEvent.mouseUp(slider);
    await waitFor(() => {
      expect(screen.getByText('Bet Accepted!')).toBeInTheDocument();
      expect(screen.getByText(/You’ve successfully accepted the bet against Bob/)).toBeInTheDocument();
      expect(screen.getByText('View Bet Details')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('opens decline panel when dragged left beyond threshold', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const slider = screen.getByAltText('Draggable orb');
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: -200 });
    fireEvent.mouseUp(slider);
    await waitFor(() => {
      expect(screen.getByText('Bet Declined')).toBeInTheDocument();
      expect(screen.getByText(/You’ve declined the bet from Bob/)).toBeInTheDocument();
      expect(screen.getByText('Back to Bets')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('closes panel when close button is clicked', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const slider = screen.getByAltText('Draggable orb');
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: 200 });
    fireEvent.mouseUp(slider);
    await waitFor(() => screen.getByText('Bet Accepted!'), { timeout: 2000 });
    const closeButton = screen.getByAltText('Close panel');
    await userEvent.click(closeButton);
    expect(screen.queryByText('Bet Accepted!')).not.toBeInTheDocument();
  });

  it('closes panel when overlay is clicked', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const slider = screen.getByAltText('Draggable orb');
    fireEvent.mouseDown(slider);
    fireEvent.mouseMove(slider, { clientX: 200 });
    fireEvent.mouseUp(slider);
    await waitFor(() => screen.getByText('Bet Accepted!'), { timeout: 2000 });
    const overlay = screen.getByTestId('overlay');
    await userEvent.click(overlay);
    expect(screen.queryByText('Bet Accepted!')).not.toBeInTheDocument();
  });

  it('shows Lottie animations when not dragging', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const animations = screen.getAllByTestId('lottie-animation');
    expect(animations).toHaveLength(2);
    animations.forEach((animation) => {
      expect(animation).toHaveClass('h-[40px]');
      expect(animation).toHaveStyle('display: block');
    });
  });

  it('hides Lottie animations and shows static arrows when dragging', async () => {
    render(<P2Pslider />);
    await waitFor(() => screen.getByText('Bob'), { timeout: 2000 });
    const slider = screen.getByAltText('Draggable orb');
    fireEvent.mouseDown(slider);
    const animations = screen.getAllByTestId('lottie-animation');
    animations.forEach((animation) => {
      expect(animation).toHaveStyle('display: block');
    });
    expect(screen.getAllByAltText('').length).toBeGreaterThan(0);
  });
});
