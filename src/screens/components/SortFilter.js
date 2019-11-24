import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import {View} from "react-native";

export default class SortFilter extends React.Component {
    render() {
        let type = [{
            value: 'iClicker 1',
        }, {
            value: 'iClicker 2',
        }];

        let cond = [{
            value: 'Like New',
        }, {
            value: 'Used',
        }];

        let S = [{
            value: 'Price',
        }, {
            value: 'Posted Date',
        }];

        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Dropdown
                    autosize={false}
                    label='Type'
                    data={type}
                />
                <Dropdown
                    autosize={false}
                    label='Condition'
                    data={cond}
                />
                <Dropdown
                    autosize={false}
                    label='Sort By'
                    data={S}
                />
            </View>
        );
    }
}