import Slider, { createSliderWithTooltip } from 'rc-slider';
import { CustomRangeStyles } from '../../../utilities/CustomRangeStyles';
import 'rc-slider/assets/index.css';

const Range = createSliderWithTooltip(Slider.Range);

export const MoviesCustomRange = ({
  formData,
  setFormData,
  name,
  min,
  max,
  step,
  state,
  marks,
  tipFormatter,
}) => {
  const handleSliderChange = (v: number[]) => {
    setFormData({
      ...formData,
      [name]: v,
    });
  };

  return (
    <div className="mb-12 py-0 px-[14px]">
      <header className="flex mb-[2.4 rem] justify-center items-center">
        <h3 className="capitalize text-black dark:text-mainTextColo mb-2 font-semibold text-[18px]">
          {name}
        </h3>
      </header>
      <Range
        className="text-[20px] mr-[5px]"
        onChange={handleSliderChange}
        defaultValue={[min, max]}
        value={state}
        min={min}
        max={max}
        step={step}
        marks={marks}
        tipFormatter={tipFormatter}
        railStyle={CustomRangeStyles.rail}
        trackStyle={CustomRangeStyles.track}
        dotStyle={CustomRangeStyles.dot}
        handleStyle={CustomRangeStyles.handle}
        tipProps={{
          placement: 'top',
          visible: true,
        }}
      />
    </div>
  );
};
