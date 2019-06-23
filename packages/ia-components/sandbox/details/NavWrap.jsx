import React from 'react';
import IAReactComponent from '../IAReactComponent';
import AnchorDetails from "../AnchorDetails";
import ConfigDetailsComponent from './ConfigDetailsComponent';
const debug = require('debug')('NavWrap');

/*
    Wrapper around most of the navigation - these could have their own components if useful

    <NavWrap item=ArchiveItem />

 */
class NavAboutsUL extends IAReactComponent {

    constructor(props) {
        super(props); //None
    }

    render() {
        return (
            <ul id="nav-abouts">
                {/*--TODO-BOOTSTRAP ongoing, was trying to make these eg. /about and use name lookup, but fails because not CORS and have not built gateway, and there is no "headless" version of these pages--*/}
                <li key="about"><a target="_top" data-event-click-tracking="TopNav|AboutLink"
                                   href="https://archive.org/about/">ABOUT</a>
                </li>
                <li key="contact"><a target="_top" data-event-click-tracking="TopNav|ContactLink"
                                     href="https://archive.org/about/contact.php">CONTACT</a></li>
                <li key="blog"><a target="_top" data-event-click-tracking="TopNav|BlogLink"
                                  href="https://blog.archive.org">BLOG</a>{/*--TODO-BOOTSTRAP this was //blog, no good reason why not forcing https --*/}
                </li>
                <li key="projects"><a target="_top" data-event-click-tracking="TopNav|ProjectsLink"
                                      href="https://archive.org/projects">PROJECTS</a></li>
                <li key="faqs"><a target="_top" data-event-click-tracking="TopNav|HelpLink"
                                  href="https://archive.org/about/faqs.php">HELP</a></li>
                <li key="donate"><a target="_top" data-event-click-tracking="TopNav|DonateLink"
                                    href="https://archive.org/donate">DONATE</a></li>
                <li key="jobs"><a target="_top" data-event-click-tracking="TopNav|JobsLink"
                                  href="https://archive.org/about/jobs.php">JOBS</a></li>
                <li key="volunteerpositions"><a target="_top" data-event-click-tracking="TopNav|VolunteerLink"
                                                href="https://archive.org/about/volunteerpositions.php">VOLUNTEER</a></li>
                <li key="bios"><a target="_top" data-event-click-tracking="TopNav|PeopleLink"
                                  href="https://archive.org/about/bios.php">PEOPLE</a></li>
            </ul>
        )
    };
}

class NavSearchLI extends IAReactComponent {

    constructor(props) {
        super(props); //None
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        debug("Search submitted");
        Nav.nav_search(this.state.value);
        event.preventDefault();
    }
    clickCallable(unusedEvent) {
        //this.formElement.submit(); // TODO Doesnt work - not sure why
        this.onSubmit(unusedEvent);
        return false;
    }
    onChange(event) {
        this.setState({value: event.target.value});
    }
    render() {
        return (
            <li id="nav-search" className="dropdown dropdown-ia pull-right" key="search">
                <a onClick={this.onClick}>
                    <span className="iconochive-search" aria-hidden="true"></span>
                    <span className="sr-only">search</span>
                </a>
                <div className="searchbar">
                    <form className="search-form js-search-form" role="search"
                          ref={this.submitable}
                          onSubmit={this.handleSubmit}
                          data-event-form-tracking="TopNav|SearchForm"
                          data-wayback-machine-search-url="https://web.archive.org/web/*/">
                        <label htmlFor="search-bar-2" className="sr-only">Search the Archive</label>
                        <input id="search-bar-2" className="js-search-bar" placeholder="Search" type="text"
                               onChange={this.onChange}
                               name="search" defaultValue=""
                               aria-controls="navbar_search_options"
                               aria-label="Search the Archive. Filters and Advanced Search available below."/>
                        <input type="submit" value="Search"/>
                    </form>
                </div>
            </li>
        )
    }
}
class NavUploadLI extends IAReactComponent {

    constructor(props) {
        super(props); //None
    }

    render() {
        return (
            <li className="dropdown dropdown-ia pull-right" key="upload">
                <a href="https://archive.org/create" target="top" data-toggle="tooltip"
                   data-placement="bottom" title="Upload">
                    <span className="iconochive-upload" aria-hidden="true"></span>
                    <span className="sr-only">upload</span>
                </a>
            </li>
        )
    }
}
class NavBrandLI extends IAReactComponent {

    constructor(props) {
        super(props); //None
    }
    clickCallable(unusedEvent) {
        Nav.nav_home();
        return false;
    }

    render() {
        return (
            <li className="navbar-brand-li" key="brand">
                <a className="navbar-brand" onClick={this.onClick} target="_top">
                    <span className="iconochive-logo" aria-hidden="true"></span>
                    <span className="sr-only">logo</span>
                </a>
            </li>
        );
    }
}

class NavMediatypeLI extends IAReactComponent {

    constructor(props) {
        super(props); //mediatype
    }

    render() {
        return (
            <li key={"mt"+this.props.mediatype} className="dropdown dropdown-ia pull-left">
                <AnchorDetails title={this.props.mediatype} className={'navia-link ' + this.props.mediatype} identifier={this.props.mediatype}
                >{/*--disabled till top hat worked on dweb-archive issue#70 -- data-top-kind={mt} data-toggle="tooltip" target="_top" data-placement="bottom"--*/}
                    <span className={'iconochive-' + this.props.mediatype} aria-hidden="true"></span>
                    <span className="sr-only">{this.props.mediatype}</span>
                </AnchorDetails>
            </li>
        );
    }
}
class NavWebDIV extends IAReactComponent {

    constructor(props) {
        super(props); //None
    }
    loadCallable(el) {
        this.hideableElement = el;
    }
    clickCallable() {
        this.hideableElement.hide();
        return false;
        // This looks wrong, the old Jquery specific search was which wouldn't appear to hide anything
        //$(this).css('padding-left','').parent().find('.iconochive-search').hide();
    }

    render() {
        return (
            <div className="row toprow web" style={{maxWidth:1000, margin: "auto"}}>
                <div className="col-xs-12">
                    <div className="wayback-txt">
                        Search the history of over 338 billion
                        <a style={{display:"inline"}}
                           href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/">web
                            pages</a> on the Internet.
                    </div>
                    <div className="roundbox7 wayback-main">
                        <div className="row">
                            <div className="col-sm-6" style={{paddingLeft:0, paddingRight:0}}>
                                <a style={{paddingBottom:0}} href="https://archive.org/web/"><img
                                    src="/images/WaybackLogoSmall.png" alt="Wayback Machine"/></a>
                            </div>
                            <div className="col-sm-6" style={{paddingTop:13}}>
                                <form style={{position:"relative"}}>
                                    <span className="iconochive-search" aria-hidden="true" ref={this.load}></span><span
                                    className="sr-only">search</span> <label htmlFor="nav-wb-url" className="sr-only">Search
                                    the Wayback
                                    Machine</label>
                                    <input id="nav-wb-url" className="form-control input-sm roundbox20"
                                           type="text"
                                           placeholder="enter URL or keywords" name="url" autoComplete="off"
                                           onClick={this.onClick}/>
                                </form>
                            </div>
                        </div>
                        {/*--/.row--*/}
                    </div>
                    {/*--/.wayback-main--*/}
                </div>
            </div>
        )
    }
}
class DwebNavDIV extends IAReactComponent {

    constructor(props) {
        super(props); //item
    }

    render() {
        // Alternative to complex nav-dweb code
        const crawl = Object.assign({ identifier: this.props.item.itemid, downloaded: this.props.item.downloaded}, this.props.item.crawl);
        return ((typeof DwebArchive === "undefined") ? null :
                <div id="nav-dweb"><span
                    className="dweb-nav-left">DWeb</span>:
                    <DwebStatusDIV/>
                    {!DwebArchive.mirror ? null :
                        <div id="dweb-mirrorconfig"><ConfigDetailsComponent {...crawl}/>
                        </div>
                    }
                    {/*--<a href="https://docs.google.com/forms/d/e/1FAIpQLSe7pXiSLrmeLoKvlDi2wODcL3ro7D6LegPksb86jr5bCJa7Ig/viewform" target="_blank"><img src="./images/feedback.svg"/></a>--*/}
                </div>
        );
    }
}

const TRANSPORT_STATUS_FAILED = 1; // From dweb-transport/Transport.js

class DwebStatusLI extends IAReactComponent {
    /*
    Construct a single transport indicator and register with DwebTransports, usually used inside a DwebStatusDIV

    Usage: <DwebStatusLI name="HTTP" status=0 />
     */
    constructor(props) {
        super(props); // name, status
        this.setState({status: props.status}); // Copy to state as will (soon) be changed by Transports
    }

    clickCallable(ev) {
        debug("Toggling transport for %s",this.props.name);
        DwebTransports.togglePaused(this.props.name, (err, s) => {
            // TODO display err.message if hover
            this.setState({error: err, status: err ? TRANSPORT_STATUS_FAILED : s});
        });
    }

    render() {
        return <li className={"transportstatus"+this.state.status} onClick={this.onClick} key={"status"+this.props.name}>{this.props.name}</li>
    }
}

class DwebStatusDIV extends IAReactComponent {
    /*
    Displays a group indicators about the status of the Dweb Transport connections.

    If DwebTransports is undefined it does nothing and adds nothing to the DOM, so it can safely be included

    When called it will ask DwebTransports for the statuses, it then builds the elements and each of those <DwebStatusLI> registers itself with the transports

    TODO unlike the previous version this wont change if something else toggles the state of transport

    Usage: <DwebStatusDIV/>

     */

    constructor(props) {
        super(props); // none
        if (typeof DwebTransports !== "undefined") {
            //TODO-DWEBNAV need to tell Transports to set this status when changes
            DwebTransports.p_statuses((err, statuses) =>  // e.g. [ { name: HTTP: status: 0 }* ]
                this.setState({statuses}));
        }
    }

    render() {
        // Alternative to complex nav-dweb code
        return ((typeof DwebTransports === "undefined") ? null :
                <div id="dweb-status">
                    {typeof this.state.statuses === "undefined" ? "Loading" :
                        <ul>
                            {this.state.statuses.map(s =>
                                <DwebStatusLI {...s} key={s.name}/>
                            )}
                        </ul>
                    }
                </div>
        );
    }
}

class NavWrap extends IAReactComponent {

    constructor(props) {
        super(props); //item and transports if running under Dweb
    }

    render() {
        /* The navigation stuff.   Order is navwrap : maincontent : itemDetailsAbout */
        /* navwrap1( navwrap2 (navhat; navbar( nav-tophat-helper; navbar-main; nav-about))) */
        {/*--TODO-DETAILS update navwrap to match actual code in both search.html and commute.html--*/
        }
        // noinspection CheckTagEmptyBody
        return (
            <div id="navwrap1">
                <div id="navwrap2">
                    <div id="nav-tophat" className="collapse">
                        <NavWebDIV/>
                        {/* TODO-DETAILS-INFOREQD Need to figure out how to auto-generator the other rows of nav-tophat for each media type */}
                    </div>

                    <div id="nav-dweb-parent" className="navbar navbar-inverse navbar-static-top" role="navigation">
                        <div id="nav-tophat-helper" className="hidden-xs"></div>
                        <ul className="nav navbar-nav navbar-main">
                            {['web', 'texts', 'movies', 'audio', 'software', 'image'].map((mediatype, n) => (
                                <NavMediatypeLI mediatype={mediatype} key={mediatype}/>
                            ))}
                            <NavBrandLI/>
                            <NavSearchLI/>
                            <NavUploadLI/>
                        </ul>
                        <NavAboutsUL/>
                        <DwebNavDIV  item={this.props.item}/>
                    </div>
                </div>
            </div>
        );
    }
}
export {NavWrap}
