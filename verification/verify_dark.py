from playwright.sync_api import sync_playwright

def verify_dark_mode():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")

            # Check for the build by saim text
            build_text = page.get_by_text("Build by saim")
            if build_text.is_visible():
                print("Found 'Build by saim'")
            else:
                print("Could not find 'Build by saim'")

            page.screenshot(path="verification/dark_mode.png")
            print("Screenshot taken at verification/dark_mode.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_dark_mode()
