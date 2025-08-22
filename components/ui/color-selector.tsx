import { TAG_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ColorSelectorProps {
  colors: string[];
  className?: string;
  onChange: (color: string) => void;
}

function ColorSelector({ colors, className, onChange }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const onColorChange = (color: string) => {
    onChange(color);
    setSelectedColor(color);
  };

  return (
    <div className="flex items-center gap-2">
      {TAG_COLORS.map((tag_color) => (
        <div
          className={cn(
            "rounded-full size-6 cursor-pointer",
            selectedColor === tag_color &&
              "border-ring ring-ring/50 ring-[3px]",
            className
          )}
          onClick={() => onColorChange(tag_color)}
          style={{ backgroundColor: tag_color }}
          key={tag_color}
        />
      ))}
    </div>
  );
}

export default ColorSelector;
