import { Fragment, useState, useEffect } from "react";
import { XCircle, Plus } from "react-feather";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap";

const CustomTabsGenerator = ({
  items = [],
  RenderdComponent,
  errorOnPage = "",
  onTabChange = () => {},
  onTabAdded = () => {},
  onTabRemoved = () => {},
}) => {
  const [active, setActive] = useState(1);
  const [tabs, setTabs] = useState(1);
  const [removedTab, setRmovedTab] = useState();

  useEffect(() => onTabChange(active), [active]);

  useEffect(() => {
    if (items && items.length > 0) {
      const ts = items.reduce((acc, item) => {
        if (!acc[item.tab]) {
          acc[item.tab] = "";
        }
        return acc;
      }, {});
      const tabCount = Object.keys(ts).length;
      if (tabCount != tabs) setTabs(tabCount);
    }
  }, [items]);

  useEffect(() => {
    if (removedTab) {
      let filteredItems = [];
      items.forEach((item) => {
        if (item.tab !== removedTab.tab) {
          if (item.tab > removedTab.tab) {
            filteredItems.push({ ...item, tab: item.tab - 1 });
          } else {
            filteredItems.push(item);
          }
        }
      });
      onTabRemoved(filteredItems, tabs);
    }
  }, [removedTab]);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <Nav tabs className="border-bottom">
        {[...Array(tabs).keys()].map((tab) => (
          <NavItem key={tab} className="border-right d-flex">
            <NavLink
              active={active === tab + 1}
              className={errorOnPage === tab + 1 && "text-danger"}
              onClick={() => {
                toggle(tab + 1);
              }}
            >
              page {tab + 1}
            </NavLink>
            {tabs > 1 && (
              <XCircle
                size={16}
                onClick={() => {
                  setTabs((tabs) => tabs - 1);
                  setRmovedTab({ tab: tab + 1 });
                }}
              />
            )}
          </NavItem>
        ))}

        <Button.Ripple
          className="btn-icon rounded-circle"
          color="flat-dark"
          size="sm"
          onClick={() => {
            onTabAdded(tabs + 1);
            setActive(tabs + 1);
            setTabs((tabs) => tabs + 1);
          }}
        >
          <Plus size={20} />
        </Button.Ripple>
      </Nav>

      <TabContent className="py-50" activeTab={active}>
        {[...Array(tabs).keys()].map((tab, i) => (
          <TabPane key={i} tabId={tab + 1}>
            {items.map(
              (item, i) =>
                item.tab === tab + 1 && (
                  <RenderdComponent key={i} item={item} index={i} />
                )
            )}
          </TabPane>
        ))}
      </TabContent>
    </Fragment>
  );
};
export default CustomTabsGenerator;
