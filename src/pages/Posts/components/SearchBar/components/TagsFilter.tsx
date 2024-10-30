import { useGetPostsTagListQuery } from '../../../../../store/api';
import styles from '../../../_posts.module.scss'
import { isFiltering } from '../../../../../store/posts';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

interface TagsProps {
  openSearch: boolean
}

const TagsFilter: React.FC<TagsProps> = ({ openSearch }) => {
  const dispatch = useDispatch()
  const { data: tags } = useGetPostsTagListQuery();

  const searchBarTags = classNames(styles.tagsFilter, {
    [styles._active]: openSearch,
  });

  return(
    <select
        className={searchBarTags}
        onChange={(e) => dispatch(isFiltering(e.target.value))}
      >
        <option></option>
        {tags?.map((tag: string, index: number) => {
          return (
            <option key={index} className={styles.tag}>
              {tag}
            </option>
          );
        })}
      </select>
  )
}

export default TagsFilter