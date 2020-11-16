import React from 'react';

export default class ViewStories extends React.Component {
  constructor(props) {
    super(props);

    // React ^16.3
    // this.storiesElement = React.createRef();

    this.storiesElement = null;
    this.storiesApi = null;

    this.state = {
      stories: this.props.stories.map((story) => Zuck.buildTimelineItem(...story)),
    };
  }

  componentDidMount() {
    let currentSkin = getCurrentSkin(); // from demo

    this.storiesApi = new Zuck(this.storiesElement, {
      backNative: true,
      previousTap: true,
      skin: currentSkin['name'],
      autoFullScreen: currentSkin['params']['autoFullScreen'],
      avatars: currentSkin['params']['avatars'],
      paginationArrows: currentSkin['params']['paginationArrows'],
      list: currentSkin['params']['list'],
      cubeEffect: currentSkin['params']['cubeEffect'],
      localStorage: true,
      stories: this.state.stories,
      reactive: true,
      callbacks: {
        onDataUpdate: function (currentState, callback) {
          this.setState(
            (state) => {
              state.stories = currentState;

              return state;
            },
            () => {
              callback();
            },
          );
        }.bind(this),
      },
    });
  }

  render() {
    if (this.state.stories == null) {
      return <div>loading...</div>;
    }
    console.log('stories', this.state.stories);

    const timelineItems = [];

    this.state.stories.forEach((story, storyId) => {
      const storyItems = [];

      story.items.forEach((storyItem) => {
        storyItems.push(
          <li
            key={storyItem.id}
            data-id={storyItem.id}
            data-time={storyItem.time}
            className={storyItem.seen ? 'seen' : ''}
          >
            <a
              href={storyItem.src}
              data-type={storyItem.type}
              data-length={storyItem.length}
              data-link={storyItem.link}
              data-linkText={storyItem.linkText}
            >
              <img src={storyItem.preview} />
            </a>
          </li>,
        );
      });

      let arrayFunc = story.seen ? 'push' : 'unshift';
      timelineItems[arrayFunc](
        <div
          className={story.seen ? 'story seen col-local' : 'story col-local'}
          key={storyId}
          data-id={storyId}
          data-last-updated={story.lastUpdated}
          data-photo={story.photo}
        >
          <a className="item-link" href={story.link}>
            <span className="item-preview">
              <img src={story.currentPreview} />
            </span>
            <span className="item-preview-avatar">
              <img src={story.photo} />
            </span>
            <span
              className="info"
              itemProp="author"
              itemScope=""
              itemType="http://schema.org/Person"
            >
              <strong className="name" itemProp="name">
                {story.name}
              </strong>
              <span className="time">{story.lastUpdated}</span>
            </span>
          </a>

          <ul className="items">{storyItems}</ul>
        </div>,
      );
    });

    return (
      <div ref={(node) => (this.storiesElement = node)} id="stories-react" className="">
        {timelineItems}
      </div>
    );
  }
}
