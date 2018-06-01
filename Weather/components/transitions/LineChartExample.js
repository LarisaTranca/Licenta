import React from 'react'
import { LineChart, Path, XAxis, Grid} from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'
import { G, Line, Text, Circle, Rect } from 'react-native-svg'
class LineChartExample extends React.PureComponent {
    constructor(props){
        super(props);
        this.state ={ data: [], hours: []};
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.weather){
            var date = new Date();
        var later=new Date();
        const hour = date.getHours();
        later.setHours(hour + 16);
        var hours = [];
        for (var i = 0; i <= 16; i+=4) {
            var inc = new Date();
            inc.setHours(hour +i);
            hours.push(parseInt(inc.getHours()));
        }
        console.log(hours)
             var weather = hours.map(function(hour){
                var findTemp = nextProps.weather.filter(function(weather){
                    return weather.FCTTIME.hour == hour;
                })[0];
                return parseInt(findTemp.temp.metric);
            });
            console.log(weather);
            weather = weather.filter(function(dt){
                return typeof dt !== 'undefined';
            });
            this.setState({data: weather, hours: hours})
        }
    }
    render() {
        
         const contentInset = { top: 20, bottom: 20 }
         var hours = this.state.hours;
        const Decorator = ({ x, y, data }) => {
            return this.state.data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
                />
            ))
        }

        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(134, 65, 244, 0.2)'}
            />
        )
        const CustomGrid = ({ x, y, data, ticks }) => (
            <G>
                {
                    // Vertical grid
                    data.map((_, index) => (
                        <Line
                            key={ index }
                            y1={ '0%' }
                            y2={ '100%' }
                            x1={ x(index) }
                            x2={ x(index) }
                            stroke={ 'white' }
                        />
                    ))
                }
            </G>
        )


        return (
            <View style={{ height: 300, padding: 25 }}>
                
                <LineChart
                    style={{ flex: 1, height:200, flexDirection:'row'}}
                    animate={true}
                    animationDuration={200}
                    data={ this.state.data }
                    gridMin={ 0 }
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ stroke: 'rgb(134, 65, 244)', strokeWidth: 4 }}
                >
                    <CustomGrid belowChart={true}/>
                    <Decorator/>
                    <Shadow/>
                </LineChart>
                 <XAxis
                        min={0}
                        max={25}
                        xAccessor={ ({ item }) => item }
                        style={{ marginHorizontal: -5, height: 30, flex:1, flexDirection:'row'}}
                        data={ hours }
                        formatLabel={(value, index) => value + ':00'}
                        contentInset={{ left: 10, right: 10, rotation: 20}}
                        svg={{ fontSize: 13, fill: 'white' }}
                        ticks={1}
                    />
            </View>
        )
    }


}

export default LineChartExample