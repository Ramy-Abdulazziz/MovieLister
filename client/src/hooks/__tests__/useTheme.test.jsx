import { renderHook } from "@testing-library/react";
import { ThemeProvider } from "../../components/Theme/ThemeProvider";
import { useTheme } from "../useTheme";

describe("useTheme hook", () => {
    it("should return the theme context value when used within a ThemeProvider", () => {
        const wrapper = ({ children }) => (
            <ThemeProvider>{children}</ThemeProvider>
        );
        const { result } = renderHook(() => useTheme(), { wrapper });
        expect(result.current.theme).toBeDefined();
        expect(typeof result.current.toggleTheme).toBe("function");
    });
});
