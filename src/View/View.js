import Top from './Top';
import Side from './Side';

export class View {
    header;
    sidebar;
    model;

    constructor(m){
        this.model = m;

        this.header = <Top fps = {20}/>;
        this.sidebar = <Side f={this.toggleSideMenu}/>;

    }

    toggleSideMenu(){
        this.model.toggleSidebarExpanded();
    }

}

export default View;