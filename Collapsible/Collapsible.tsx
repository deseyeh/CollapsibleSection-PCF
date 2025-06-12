import * as React from "react";
import { FontIcon } from "@fluentui/react";
import {
  FluentProvider,
  makeStyles,
  ToggleButton,
  Tooltip,
  webLightTheme,
} from "@fluentui/react-components";

export interface ICollapseProps {
  name?: string;
  toggleValue: boolean;
  textColor: string;
  bgColor: string;
  hoverColor: string;
  textSize: number;
  textWeight: string;
  textPadding: string;
  leftIcon: string;
  hideFields: (currentState: boolean) => void;
}

const Collapse = ({
  name,
  toggleValue,
  textColor,
  bgColor,
  hoverColor,
  textSize,
  textWeight,
  textPadding,
  leftIcon,
  hideFields,
}: ICollapseProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(toggleValue);
  const [isHover, setIsHover] = React.useState(false);

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: bgColor,
    color: textColor,
    padding: textPadding,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    fontSize: `${textSize}px`,
    fontWeight: textWeight,
    border: "none",
    borderRadius: "3px",
  };

  // const handleExpand = (newChecked: boolean) => {
  //   if (newChecked !== isCollapsed) {
  //     setIsCollapsed(newChecked);
  //     hideFields(newChecked);
  //   }
  // };

  // React.useEffect(() => {
  //   console.log("useEffect", isClosed);
  //   handleExpand(isClosed);
  // }, [isClosed]);

  const leftFluentIcon = leftIcon && (
    <FontIcon iconName={leftIcon} style={{ marginRight: 8, fontSize: 16 }} />
  );
  const handleToggleChange = React.useCallback(
    (newChecked: boolean) => {
      setIsCollapsed(newChecked);
      hideFields(newChecked);
    },
    [isCollapsed]
  );
  // Sync with parent state when `toggleValue` changes
  React.useEffect(() => {
    handleToggleChange(toggleValue);
  }, [toggleValue]);

  return (
    <FluentProvider theme={webLightTheme}>
      <ToggleButton
        style={{
          ...buttonStyle,
          backgroundColor: isHover ? hoverColor : buttonStyle.backgroundColor,
        }}
        checked={isCollapsed}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => handleToggleChange(!isCollapsed)}
      >
        {leftFluentIcon}

        <span
          style={{
            display: "flex",
            width: "100%",
            alignSelf: "start",
          }}
        >
          {name}
        </span>
        <FontIcon
          iconName={isCollapsed ? "ChevronUpMed" : "ChevronDownMed"}
          style={{ marginRight: 8, fontSize: 16 }}
        />
      </ToggleButton>
    </FluentProvider>
  );
};

export default Collapse;
