import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from "react-virtualized";
import ImageMeasurer from "react-virtualized-image-measurer";
import InfiniteScroll from "react-infinite-scroll-component";
import PicModel  from './picModel'

// import list from "./data";

// Array of images with captions
//const list = [{image: 'http://...', title: 'Foo'}];

// We need to make sure images are loaded from scratch every time for this demo
// const noCacheList = list.map((item, index) => ({
//   title: index + ". " + item.title,
//   image: item.image + (item.image ? "?noCache=" + Math.random() : "")
// }));

const keyMapper = (item, index) => item.image || index;

const columnWidth = 200;
const defaultHeight = 250;
const defaultWidth = columnWidth;

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight,
  defaultWidth,
  fixedWidth: true
});
// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositionerConfig = {
  cellMeasurerCache: cache,
  columnCount: 6,
  columnWidth,
  spacer: 10
};


const cellPositioner = createMasonryCellPositioner(cellPositionerConfig);

const MasonryComponent = ({ itemsWithSizes,enlarge, setRef }) => {
  const cellRenderer = ({ index, key, parent, style }) => {
    const { item, size } = itemsWithSizes[index];
    const height = columnWidth * (size.height / size.width) || defaultHeight;

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          {/* <div>{item.title}</div> */}
          {item.image && (
           
            // <Link to={{
            //   pathname: '/picModel',
            //   state: {
            //     images: itemsWithSizes,
            //     photoIndex : index
            //   }
            // }}>
           <button border="none" display="inline-block" onClick={()=>{
              enlarge(index)
            }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                height: height,
                width: columnWidth,
                display: "block"
              }}
            />
            </button>
            // </Link>
          )}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <Masonry
      cellCount={itemsWithSizes.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={560}
      width={1263}
      keyMapper={keyMapper}
      ref={setRef}
    />
  );
};

class Index extends React.Component {
  // state = { images: noCacheList,
  //           display: false };
  constructor(props){
    super(props)
    this.state ={ 
       images : this.props.images?this.props.images:[],
       page: 1,
       display: false,
    }
  }
  masonryRef = null;
  componentDidMount(){
    console.log("comp mount")
    fetch(`https://api.unsplash.com/photos?page=${this.state.page}&client_id=D-zgXYeU8J0EdC1AiSQfCITgcp_Gjws3mS23ZxdtMXE&per_page=25`)
    .then((res)=>{
        console.log("resp came")
        return res.json()
    })
    .then((res) => {
        console.log('got this',res)
        let noCacheList = res.map((item, index) => ({
          title: index + ". " + item.urls.regular,
          image: item.urls.regular + (item.urls.regular ? "?noCache=" + Math.random() : "")
        }));
        this.setState({ images: noCacheList,
          display: false })
       
    })
  }
  enlarge = (params)=> {
    console.log("params", params)
    this.setState({index : params,  display:!this.state.display}, ()=>{
        console.log("after set state img", this.state.index);
    })
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    this.masonryRef.clearCellPositions();
  }
  fetchMoreData = () =>{
    this.setState({page: this.state.page+1}, ()=>{
      fetch(`https://api.unsplash.com/photos?page=${this.state.page}&client_id=D-zgXYeU8J0EdC1AiSQfCITgcp_Gjws3mS23ZxdtMXE&per_page=25`)
      .then((res)=>{
          console.log("resp came")
          return res.json()
      })
      .then((res) => {
          console.log('got this',res)
          let noCacheList = res.map((item, index) => ({
            title: index + ". " + item.urls.regular,
            image: item.urls.regular + (item.urls.regular ? "?noCache=" + Math.random() : "")
          }));
          this.setState({ images: this.state.images.concat(noCacheList),
            display: false })
        
      })
    })
  }
  shorten = () => {
    cache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
    this.masonryRef.clearCellPositions();
    this.setState({ images: [...this.state.images.slice(1)] });
  };
  toggleDisplay = () => {
    this.setState({display: !this.state.display})
  };

  

  setMasonry = node => (this.masonryRef = node);

  render() {
    let ele= ''
    if(this.state.images  && !this.state.display){
      ele = <div>
        {/* <button onClick={this.shorten}>Resize</button> */}
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4></h4>}
        >
        <ImageMeasurer
          items={this.state.images}
          image={item => item.image}
          keyMapper={keyMapper}
          onError={(error, item, src) => {
            console.error(
              "Cannot load image",
              src,
              "for item",
              item,
              "error",
              error
            );
          }}
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
        >
          
          {({ itemsWithSizes }) => (
            <MasonryComponent
              setRef={this.setMasonry}
              enlarge={this.enlarge}
              itemsWithSizes={itemsWithSizes}
            >
            </MasonryComponent>
          )}
        </ImageMeasurer>
        </InfiniteScroll>
      </div>
    }else{
      ele = <PicModel images={this.state.images} photoIndex={this.state.index}  toggleDisplay={this.toggleDisplay}></PicModel>
    }
    return (
    <div>{ele}</div>
    );
  }
}

// Render your grid
// render(<Index />, document.getElementById("root"));
export default Index