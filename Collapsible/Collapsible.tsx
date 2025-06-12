import * as React from "react";
import { FontIcon } from "@fluentui/react";

export interface ICollapseProps {
  name?: string;
  isClosed: boolean;
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
  isClosed,
  textColor,
  bgColor,
  hoverColor,
  textSize,
  textWeight,
  textPadding,
  leftIcon,
  hideFields,
}: ICollapseProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(isClosed);
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

  const handleExpand = () => {
    hideFields(!isCollapsed);
    setIsCollapsed(!isCollapsed);
  };
  const leftFluentIcon = leftIcon && (
    <FontIcon iconName={leftIcon} style={{ marginRight: 8, fontSize: 16 }} />
  );

  React.useEffect(() => {
    setIsCollapsed(isClosed);
  }, [isClosed]);

  return (
    <button
      style={{
        ...buttonStyle,
        backgroundColor: isHover ? hoverColor : buttonStyle.backgroundColor,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleExpand}
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
    </button>
  );
};

export default Collapse;
