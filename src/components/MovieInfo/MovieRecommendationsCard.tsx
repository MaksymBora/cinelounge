import { Link } from 'react-router-dom';
import { imageBase } from '@/service/imagePath';

interface MovieRecommendationsCardProps {
  title: string;
  backdrop_path: string;
  id: number;
}

export const MovieRecommendationsCard = ({
  title,
  backdrop_path,
  id,
}: MovieRecommendationsCardProps) => {
  return (
    <li className="flex flex-col rounded-[4px] shadow-castShadow border">
      <Link to={`/${id}`} className="flex z-[2]">
        <img
          src={`${imageBase}w780${backdrop_path}`}
          loading="lazy"
          alt={title}
          className="rounded-b-[3px]"
        />
      </Link>
      <div className="p-3 bg-white dark:bg-bgCard whitespace-nowrap overflow-hidden text-ellipsis">
        <h3 className="text-black dark:text-mainTextColo font-medium">
          {title}
        </h3>
      </div>
    </li>
  );
};
