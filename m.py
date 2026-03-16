import numpy as np
from scipy import stats

alpha = 0.01

print("===== Paired t-test Program =====")

# -----------------------------
# 1. Input Data
# -----------------------------
before_input = input("Enter BEFORE values (comma separated): ")
after_input = input("Enter AFTER values (comma separated): ")

# convert to numpy arrays
before = np.array([float(x) for x in before_input.split(",")])
after = np.array([float(x) for x in after_input.split(",")])

# -----------------------------
# 2. Data Validation
# -----------------------------
if len(before) != len(after):
    print("Error: Before and After must have the same number of observations.")
    exit()

# -----------------------------
# 3. Difference
# -----------------------------
d = before - after

n = len(d)
df = n - 1

# -----------------------------
# 4. Descriptive statistics
# -----------------------------
mean_before = np.mean(before)
mean_after = np.mean(after)

mean_d = np.mean(d)
std_d = np.std(d, ddof=1)

# -----------------------------
# 5. t statistic (manual)
# -----------------------------
t_stat_manual = mean_d / (std_d / np.sqrt(n))

# -----------------------------
# 6. scipy paired t-test
# -----------------------------
t_stat, p_two = stats.ttest_rel(before, after)
p_one = p_two / 2

# -----------------------------
# 7. Critical value
# -----------------------------
t_critical = stats.t.ppf(1 - alpha, df)

# -----------------------------
# 8. Output Results
# -----------------------------
print("\n===== Results =====")

print("\nBefore:", before)
print("After :", after)

print("\nDifferences (Before - After):")
print(d)

print("\n--- Descriptive Statistics ---")
print(f"Sample size: {n}")
print(f"Mean Before: {mean_before:.3f}")
print(f"Mean After : {mean_after:.3f}")
print(f"Mean Difference: {mean_d:.3f}")
print(f"Std Difference: {std_d:.3f}")

print("\n--- Hypothesis Test ---")
print("H0: μd = 0")
print("H1: μd > 0")

print(f"\nt statistic: {t_stat_manual:.4f}")
print(f"Critical t (alpha={alpha}): {t_critical:.4f}")
print(f"One-tailed p-value: {p_one:.4f}")

print("\n--- Decision ---")

if t_stat_manual > t_critical:
    print("Reject H0")
else:
    print("Fail to Reject H0")

print("\n--- Conclusion ---")

if p_one < alpha:
    print("There is significant evidence that the program reduced failures.")
else:
    print("There is NOT enough evidence at the 0.01 level to conclude failures decreased.")