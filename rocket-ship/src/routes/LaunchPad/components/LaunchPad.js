import { ClassRocket, FunctionalRocket } from './Rocket';
import '../styles/_launchpad.scss';

export default function LaunchPad() {
  // Rocket never launches, so prevent re-render by removing useEffect
  return (
    <div className="launchpad">
      <FunctionalRocket />
    </div>
  );
}
